'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { enqueueSnackbar } from 'notistack';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCheckbox, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const RegisterSchema = Yup.object().shape({
    businessName: Yup.string().required('Business name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .min(8, 'Password must be at least 8 characters long'),
    contactInfo: Yup.string().required('Contact info is required'),
  });

  const defaultValues = {
    businessName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactInfo: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        businessName: data.businessName,
        email: data.email,
        contactInfo: data.contactInfo,
        password: data.password,
      };
      await register(payload);
      enqueueSnackbar('Registration successful', { variant: 'success' });
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
      reset();
      enqueueSnackbar('Something went wrong', { variant: 'error' });
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Enter Your Details</Typography>

      <Typography variant="body2" color="text.secondary">
        Kindly fill in all the required fields marked with *.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField
          name="businessName"
          label="Business Name*"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <RHFTextField
          name="contactInfo"
          label="Contact Info*"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <RHFTextField
          name="email"
          label="Email*"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />

        <RHFTextField
          name="password"
          label="Password*"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify
                    icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    sx={{ color: '#64BFB8' }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirm Password*"
          type={confirmPassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={confirmPassword.onToggle} edge="end">
                  <Iconify
                    icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    sx={{ color: '#64BFB8' }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            bgcolor: '#64BFB8',
            color: '#FFFFFF',
            '&:hover': {
              bgcolor: '#64BFB8',
              color: '#FFFFFF',
            },
          }}
        >
          Create account
        </LoadingButton>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link component={RouterLink} href={paths.auth.jwt.login}>
            Login
          </Link>
        </Typography>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}
    </>
  );
}
