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

export default function JwtCustomerView() {
  const { register } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const password = useBoolean();
  const confirmPassword = useBoolean();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    primaryUserEmail: Yup.string()
      .email('Email must be a valid email address')
      .notOneOf([Yup.ref('email')], 'Email must not be the same as the caregiver  email')
      .optional(),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .min(8, 'Password must be at least 8 characters long'),
    isOver18: Yup.boolean().oneOf([true], 'You must confirm that you are over 18 years old'),
    agreeToTerms: Yup.boolean().oneOf(
      [true],
      'You must agree to the Terms & Conditions and Privacy Policy'
    ),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    primaryUserEmail: '',
    password: '',
    confirmPassword: '',
    isOver18: false,
    agreeToTerms: false,
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
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        primaryUserEmail: data.primaryUserEmail || undefined,
        password: data.password,
      };
      await register(payload);
      enqueueSnackbar('Registration successful', { variant: 'success' });
      router.push(`${paths.auth.jwt.otpVerification}?email=${encodeURIComponent(data.email)}`);
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
          name="firstName"
          label="First Name*"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
        />
        <RHFTextField
          name="lastName"
          label="Last Name*"
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
          name="primaryUserEmail"
          label="Primary User Email"
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

        <Stack spacing={1}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <RHFCheckbox
              name="isOver18"
              label={
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.8 }}>
                  Are you over 18 years old?
                </Typography>
              }
              sx={{ m: 0, alignItems: 'flex-start' }}
            />

            <Tooltip
              title={
                <Typography
                  component="span"
                  sx={{
                    display: 'block',
                    fontStyle: 'italic',
                    fontSize: 13,
                    lineHeight: 1.5,
                    color: '#637381',
                    bgcolor: '#F3F3F3',
                    textAlign: 'left',
                  }}
                >
                  By continuing, you confirm that you are 18 years or older.
                </Typography>
              }
              placement="top"
              arrow
              enterDelay={200}
              leaveDelay={100}
              slotProps={{
                popper: {
                  modifiers: [
                    {
                      name: 'offset',
                      options: {
                        offset: [0, -6],
                      },
                    },
                  ],
                },
                tooltip: {
                  sx: {
                    bgcolor: '#F3F3F3',
                    color: '#637381',
                    border: '1px solid #E5E7EB',
                    borderRadius: '10px',
                    px: 2,
                    py: 1.5,
                    maxWidth: 240,
                    boxShadow: '0px 4px 16px rgba(15, 23, 42, 0.08)',
                    '& .MuiTooltip-arrow': {
                      color: '#F9FAFB',
                      '&::before': {
                        backgroundColor: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                      },
                    },
                  },
                },
              }}
            >
              <IconButton
                size="small"
                sx={{
                  color: '#9CA3AF',
                  mt: 0.5,
                  width: 28,
                  height: 28,
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: '#F3F4F6',
                  },
                }}
              >
                <Iconify icon="eva:info-outline" width={18} />
              </IconButton>
            </Tooltip>
          </Stack>

          <RHFCheckbox
            name="agreeToTerms"
            label={
              <Typography variant="body2" color="text.secondary" component="span" sx={{ mt: 0.8 }}>
                I agree to the{' '}
                <Link
                  href={paths.auth.termsAndConditions}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{ color: '#64BFB8' }}
                  onClick={(event) => event.stopPropagation()}
                >
                  Terms & Conditions
                </Link>
                {' and '}
                <Link
                  href={paths.auth.privacyPolicy}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{ color: '#64BFB8' }}
                  onClick={(event) => event.stopPropagation()}
                >
                  Privacy Policy
                </Link>
                .
              </Typography>
            }
            sx={{ m: 0, alignItems: 'flex-start' }}
          />
        </Stack>

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
