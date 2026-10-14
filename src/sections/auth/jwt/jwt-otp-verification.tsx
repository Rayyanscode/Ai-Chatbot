'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { useState, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { resendAccountCodeAPI, verifyRegistrationOtpAPI } from 'src/api/auth';
import { useSnackbar } from 'src/components/snackbar';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import FormProvider from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import CustomLoadingButton from 'src/components/button/custon-loading-button';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function JwtOtpVerificationView() {
  const CODE_LENGTH = 6;
  const OTP_PLACEHOLDER = '2';

  const { enqueueSnackbar } = useSnackbar();
  const { logout } = useAuthContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';

  const [otp, setOtp] = useState<string[]>(Array.from({ length: CODE_LENGTH }, () => ''));
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const OtpSchema = Yup.object({
    code: Yup.string()
      .required('Code is required')
      .matches(/^\d+$/, 'Code must be digits only')
      .length(CODE_LENGTH, `Code must be ${CODE_LENGTH} digits`),
  });

  const methods = useForm({
    resolver: yupResolver(OtpSchema),
    defaultValues: { code: '' },
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

    if (!digits && rawValue !== '') return;

    const next = [...otp];

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

    next[index] = digits;
    setOtp(next);
    syncCodeToForm(next);

    if (digits && index < CODE_LENGTH - 1) {
      focusIndex(index + 1);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key !== 'Backspace') return;

    if (!otp[index] && index > 0) {
      focusIndex(index - 1);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    if (isResending) return;
    try {
      await verifyRegistrationOtpAPI(email, data.code);
      await logout?.();
      enqueueSnackbar('Account verified successfully! Please sign in.', { variant: 'success' });
      router.push(paths.auth.jwt.login);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || error.error, { variant: 'error' });
    }
  });

  async function handleResendCode() {
    if (isResending || isSubmitting || !email) return;

    setIsResending(true);
    try {
      const response = await resendAccountCodeAPI(email);
      enqueueSnackbar(response?.message || 'Code sent to your email!', {
        variant: 'success',
      });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error?.message || error.error, { variant: 'error' });
    } finally {
      setIsResending(false);
    }
  }

  const renderHead = (
    <Stack sx={{ mt: 3 }} spacing={1.5}>
      <Typography variant="h5" sx={{ color: '#212B36' }}>
        OTP Confirmation
      </Typography>
      <Typography sx={{ color: '#637381', fontSize: '14px' }}>
        We&apos;ve sent a 6-digit code to your email. Please enter the code below to verify your
        account.
      </Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} pt={4}>
      {(() => {
        const hasOtpError = !!errors.code?.message;

        return (
          <Box
            display="grid"
            gridTemplateColumns={`repeat(${CODE_LENGTH}, minmax(48px, 1fr))`}
            columnGap={1}
            sx={{ width: '100%' }}
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
                    maxLength: index === 0 ? CODE_LENGTH : 1,
                    inputMode: 'numeric',
                    style: { textAlign: 'center', fontSize: '14px' },
                  }}
                  placeholder={OTP_PLACEHOLDER}
                  sx={{ width: '100%' }}
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
          disabled={isSubmitting || isResending || !email}
          sx={{ cursor: 'pointer', color: '#64BFB8', fontSize: '14px', fontWeight: 600 }}
        >
          Resend code
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
    </FormProvider>
  );
}
