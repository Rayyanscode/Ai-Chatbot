'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
// routes
import { forgotPasswordAPI } from 'src/api/auth';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import CustomLoadingButton from 'src/components/button/custon-loading-button';

// ----------------------------------------------------------------------

export default function JwtForgotPasswordView() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // TODO: Implement API call
      await forgotPasswordAPI(data.email);
      enqueueSnackbar(`Reset code sent to email: ${data.email}!`, {
        variant: 'success',
      });
      router.push(`${paths.auth.jwt.verifyOtp}?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || error.error, { variant: 'error' });
    }
  });

  const renderHead = (
    <Stack sx={{ mt: 3 }} spacing={1.5}>
      <Typography variant="h5" sx={{ color: '#212B36' }}>
        Forget Password? Don&apos;t Worry!
      </Typography>
      <Typography sx={{ color: '#212B36', fontSize: '14px' }}>
        Enter your email address and we will send you a 6-digit code to reset your password.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={3} pt={4}>
      <RHFTextField
        name="email"
        label="Email Address"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />
      <CustomLoadingButton
        fullWidth
        type="submit"
        loading={isSubmitting}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 3,
          py: 1.5,
          bgcolor: '#64BFB8',
          color: '#FFFFFF',
          '&:hover': {
            bgcolor: '#64BFB8',
            color: '#FFFFFF',
          },
        }}
      >
        <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Send Code</Typography>
        <Iconify icon="solar:alt-arrow-right-linear" />
      </CustomLoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.jwt.login}
        variant="body2"
        sx={{ color: '#212B36', alignSelf: 'center', '&:hover': { textDecoration: 'underline' } }}
      >
        <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
          <Iconify icon="solar:alt-arrow-left-linear" width={16} height={16} />
          <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Return to sign in</Typography>
        </Box>
      </Link>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
