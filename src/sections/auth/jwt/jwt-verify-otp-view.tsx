'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button, Divider, IconButton, InputAdornment, Link } from '@mui/material';
import { useState, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { resendOtpAPI, verifyOtpAndChangePasswordAPI } from 'src/api/auth';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import CustomLoadingButton from 'src/components/button/custon-loading-button';

// routes

// ----------------------------------------------------------------------

export default function JwtVerifyOtpView() {
  const CODE_LENGTH = 6;
  const OTP_PLACEHOLDER = '2';

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || 'johnsondoe@nomail.com';
  const password = useBoolean();
  const confirmPassword = useBoolean();

  const [otp, setOtp] = useState<string[]>(Array.from({ length: CODE_LENGTH }, () => ''));
  const [errorMsg, setErrorMsg] = useState('');
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const VerifyOtpSchema = Yup.object({
    code: Yup.string()
      .required('Code is required')
      .matches(/^\d+$/, 'Code must be digits only')
      .length(CODE_LENGTH, `Code must be ${CODE_LENGTH} digits`),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const defaultValues = {
    code: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(VerifyOtpSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  const syncCodeToForm = (nextOtp: string[]) => {
    setValue('code', nextOtp.join(''), {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const focusIndex = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleOtpChange = (index: number, rawValue: string) => {
    const digits = rawValue.replace(/\D/g, '');

    // if user typed a non-digit, ignore
    if (!digits && rawValue !== '') return;

    const next = [...otp];

    // Paste / multi-char input
    if (digits.length > 1) {
      const chunk = digits.slice(0, CODE_LENGTH - index).split('');
      chunk.forEach((d, i) => {
        if (index + i < CODE_LENGTH) next[index + i] = d;
      });

      setOtp(next);
      syncCodeToForm(next);

      focusIndex(Math.min(index + chunk.length, CODE_LENGTH - 1));
      return;
    }

    // Single digit
    next[index] = digits;
    setOtp(next);
    syncCodeToForm(next);

    if (digits && index < CODE_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key !== 'Backspace') return;

    // If current is empty, go back; otherwise let the field clear first
    if (!otp[index] && index > 0) {
      focusIndex(index - 1);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isResending) return;
    try {
      await verifyOtpAndChangePasswordAPI(email, data.code, data.password);
      enqueueSnackbar('Verification success!', { variant: 'success' });
      router.push(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || error.error, { variant: 'error' });
      setErrorMsg(error?.message || error.error);
    }
  });

  async function handleResendCode() {
    if (isResending || isSubmitting) return;

    setIsResending(true);
    try {
      const response = await resendOtpAPI(email);
      enqueueSnackbar(response?.message || 'Code sent to your email!', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || error.error, { variant: 'error' });
      setErrorMsg(error?.message || error.error);
    } finally {
      setIsResending(false);
    }
  }

  const renderHead = (
    <Stack sx={{ mt: 3 }} spacing={1.5}>
      <Typography variant="h5" sx={{ color: '#212B36' }}>
        Reset Password
      </Typography>
      <Typography sx={{ color: '#212B36', fontSize: '14px' }}>
        we&apos;ve sent a 6-digit code to your email. Please enter the code below to update your
        password.
      </Typography>
      {!!errorMsg && (
        <Typography variant="body2" sx={{ color: 'error.main', mt:2 }}>
          {errorMsg}
        </Typography>
      )}
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} pt={4}>
      {/**
       * Show OTP error on every cell for clearer feedback
       */}
      {(() => {
        const hasOtpError = !!errors.code?.message;

        return (
          <Box
            display="grid"
            gridTemplateColumns={`repeat(${CODE_LENGTH}, minmax(48px, 1fr))`}
            columnGap={1}
            sx={{
              width: '100%',
            }}
          >
            {otp.map((digit, index) => (
              <Box key={index}>
                <TextField
                  value={digit}
                  error={hasOtpError}
                  autoFocus={index === 0}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  name={`otp-${index}`}
                  inputRef={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  inputProps={{
                    maxLength: index === 0 ? CODE_LENGTH : 1, // Allow paste in first field
                    inputMode: 'numeric',
                    style: { textAlign: 'center', fontSize: '14px' },
                  }}
                  placeholder={OTP_PLACEHOLDER}
                  sx={{
                    width: '100%',
                  }}
                />
              </Box>
            ))}
          </Box>
        );
      })()}

      {!!errors.code?.message && (
        <Typography variant="body2" sx={{ color: 'error.main' }}>
          {errors.code.message}
        </Typography>
      )}

      <RHFTextField
        label="Password"
        name="password"
        placeholder="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                  color="#64BFB8"
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        label="Confirm Password"
        name="confirmPassword"
        placeholder="Confirm Password"
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
        <Typography sx={{ fontSize: '14px', fontWeight: 500 }}>Verify Code</Typography>
        <Iconify icon="solar:alt-arrow-right-linear" />
      </CustomLoadingButton>

      <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#212B36' }}>
          Don&apos;t have a code?
        </Typography>
        <Button
          onClick={() => handleResendCode()}
          disabled={isSubmitting || isResending}
          sx={{ cursor: 'pointer', color: '#64BFB8', fontSize: '14px', fontWeight: 600 }}
        >
          Resend Code
        </Button>
      </Stack>

      <Divider />
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
