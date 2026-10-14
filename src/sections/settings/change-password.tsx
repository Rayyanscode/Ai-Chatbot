import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { changePasswordAPI } from 'src/api/profile';

export default function ChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const oldPassword = useBoolean();
  const newPassword = useBoolean();
  const confirmPassword = useBoolean();

  const schema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .test(
        'no-match',
        'New password must be different than old password',
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await changePasswordAPI({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      enqueueSnackbar(response.message ?? 'Password updated', { variant: 'success' });
      reset();
    } catch (error) {
      enqueueSnackbar(error?.message ?? error?.response?.data?.message ?? 'Update failed', {
        variant: 'error',
      });
    } finally {
      oldPassword.onFalse();
      newPassword.onFalse();
      confirmPassword.onFalse();
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack
        component={Card}
        spacing={3}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 2,
          boxShadow: (theme) => theme.customShadows?.z8,
        }}
      >
        <RHFTextField
          name="oldPassword"
          type={oldPassword.value ? 'text' : 'password'}
          label="Old Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={oldPassword.onToggle} edge="end">
                  <Iconify
                    icon={oldPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    color="#64BFB8"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="newPassword"
          label="New Password"
          type={newPassword.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={newPassword.onToggle} edge="end">
                  <Iconify
                    icon={newPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    color="#64BFB8"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} /> Password must be minimum
              8+
            </Stack>
          }
        />

        <RHFTextField
          name="confirmPassword"
          type={confirmPassword.value ? 'text' : 'password'}
          label="Confirm Password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={confirmPassword.onToggle} edge="end">
                  <Iconify
                    icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    color="#64BFB8"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{
            ml: { xs: 0, sm: 'auto' },
            width: { xs: 1, sm: 'auto' },
            backgroundColor: 'primary.main',
            color: 'white',
            px: 2.5,
            borderRadius: 1,
            textTransform: 'none',
          }}
        >
          Save Changes
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
