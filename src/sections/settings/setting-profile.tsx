import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
// components
import Iconify from 'src/components/iconify';
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { updateProfileAPI } from 'src/api/profile';

type FormValues = {
  name: string;
  contactInfo: string;
};

function EditIconButton({ onClick }: { onClick: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        border: 'none',
        outline: 'none',
        bgcolor: 'transparent',
        cursor: 'pointer',
        p: 0,
        flexShrink: 0,
        '&:focus': { outline: 'none' },
      }}
    >
      <Iconify icon="lucide:edit" width={18} sx={{ color: '#64BFB8' }} />
    </Box>
  );
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    '& fieldset': {
      borderColor: 'divider',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'text.secondary',
  },
};

export default function SettingProfile() {
  const { enqueueSnackbar } = useSnackbar();
  const { user, refreshUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isContactInfoEditing, setIsContactInfoEditing] = useState(false);

  const schema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    contactInfo: Yup.string().required('Contact info is required'),
  });

  const defaultValues = useMemo<FormValues>(
    () => ({
      name: user?.name ?? '',
      contactInfo: user?.contactInfo ?? '',
    }),
    [user]
  );

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await updateProfileAPI({ name: data.name, contactInfo: data.contactInfo });
      await refreshUser();
      reset(data);
      setIsEditing(false);
      setIsContactInfoEditing(false);
      enqueueSnackbar(response?.message ?? 'Profile updated successfully', {
        variant: 'success',
      });
    } catch (error) {
      enqueueSnackbar(error?.message ?? error?.response?.data?.message ?? 'Update failed', {
        variant: 'error',
      });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
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
              name="name"
              label="Full name"
              disabled={!isEditing}
              sx={fieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIconButton onClick={() => setIsEditing(true)} />
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="contactInfo"
              label="Contact info"
              disabled={!isContactInfoEditing}
              sx={fieldSx}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EditIconButton onClick={() => setIsContactInfoEditing(true)} />
                  </InputAdornment>
                ),
              }}
            />

            <LoadingButton
              type="submit"
              variant="contained"
              loading={isSubmitting}
              disabled={!isDirty}
              sx={{
                ml: { xs: 0, sm: 'auto' },
                width: { xs: 1, sm: 'auto' },
                px: 2.5,
                py: 1,
                borderRadius: 1.5,
                textTransform: 'none',
                backgroundColor: '#64BFB8',
                color: 'white',
                boxShadow: 'none',
                '&:hover': {
                  backgroundColor: '#64BFB8',
                  boxShadow: 'none',
                },
              }}
            >
              Save Changes
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
