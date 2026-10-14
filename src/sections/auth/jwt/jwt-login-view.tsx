'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
// routes
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { useSnackbar } from 'src/components/snackbar';
import CustomLoadingButton from 'src/components/button/custon-loading-button';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const passwordInput = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: searchParams.get('email') || '',
    password: searchParams.get('password') || '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // const user = await login?.(data.email, data.password);

      // if (user && user.isVerified === false) {
      //   enqueueSnackbar('Please verify your account to continue', { variant: 'warning' });
      //   router.push(`${paths.auth.jwt.verifyAccount}?email=${encodeURIComponent(data.email)}`);
      //   return;
      // }

      router.push(returnTo || PATH_AFTER_LOGIN);
      enqueueSnackbar('Login successful', { variant: 'success' });
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
      enqueueSnackbar(error?.message || error.error, { variant: 'error' });
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h6">Log In to Your Account</Typography>
      <Typography sx={{ fontSize: '12px', color: 'text.secondary' }}>
        Enter Your Account Details Below.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField
        name="email"
        label="Email Address *"
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />

      <RHFTextField
        name="password"
        label="Password *"
        type={passwordInput.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={passwordInput.onToggle} edge="end">
                <Iconify
                  icon={passwordInput.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  sx={{ color: '#64BFB8' }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
        component={RouterLink}
        href={paths.auth.jwt.forgotPassword}
      >
        Forgot password?
      </Link>

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
        <Typography sx={{ fontSize: '14px', fontWeight: 600 }}>Login</Typography>
        <Iconify icon="solar:alt-arrow-right-linear" />
      </CustomLoadingButton>

      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
        Don&apos;t have an account?{' '}
        <Link component={RouterLink} href={paths.auth.jwt.register}>
          Sign up
        </Link>
      </Typography>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
