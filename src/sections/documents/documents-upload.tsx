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
import { uploadDocument } from 'src/api/documents';

// ----------------------------------------------------------------------

type Props = {
  onSuccess?: () => void;
};

export default function DocumentsUpload({ onSuccess }: Props) {
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    documents: Yup.array().min(1, 'Please upload at least one PDF'),
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      const files = data.documents || [];

      for (let i = 0; i < files.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await uploadDocument(files[i]);
      }

      enqueueSnackbar(
        files.length === 1
          ? `"${files[0].name}" uploaded successfully`
          : `${files.length} files uploaded successfully`,
        { variant: 'success' }
      );
      setValue('documents', []);
      onSuccess?.();
    } catch (error: any) {
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
          accept={{ 'application/pdf': ['.pdf'] }}
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
            bgcolor: '#64BFB8',
            '&:hover': { bgcolor: '#4fa8a1' },
          }}
        >
          Upload
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
