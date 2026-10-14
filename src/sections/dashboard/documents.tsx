'use client';

import { useCallback } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// components
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function Documents() {
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    documents: Yup.array().min(1, 'Please upload at least one document'),
  });

  const defaultValues = {
    documents: [] as File[],
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.documents || [];
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );
      setValue('documents', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.documents]
  );

  const handleRemove = useCallback(
    (inputFile: File | string) => {
      const filtered = (values.documents || []).filter((file) => file !== inputFile);
      setValue('documents', filtered, { shouldValidate: true });
    },
    [setValue, values.documents]
  );

  const handleRemoveAll = useCallback(() => {
    setValue('documents', [], { shouldValidate: true });
  }, [setValue]);

  const onSubmit = handleSubmit(async () => {
    try {
      enqueueSnackbar('Documents uploaded', { variant: 'success' });
      setValue('documents', []);
    } catch (error) {
      enqueueSnackbar(error?.message ?? 'Upload failed', { variant: 'error' });
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
        <RHFUpload
          multiple
          name="documents"
          accept={{
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
          }}
          onDrop={handleDrop}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!values.documents?.length}
          sx={{
            ml: { xs: 0, sm: 'auto' },
            width: { xs: 1, sm: 'auto' },
            textTransform: 'none',
          }}
        >
          Upload
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
