'use client';

import { useState, useRef } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FileThumbnail from 'src/components/file-thumbnail';
import { deleteDocument, formatBytes, uploadDocument, useGetDocuments } from 'src/api/documents';
import type { DocumentItem } from 'src/types/document';

// ----------------------------------------------------------------------

export default function DocumentsView() {
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    documents: apiDocuments,
    documentsLoading,
    documentsError,
    mutateDocuments,
  } = useGetDocuments();

  const [localDocuments, setLocalDocuments] = useState<DocumentItem[]>([]);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const documents = documentsError ? localDocuments : [...localDocuments, ...apiDocuments];
  const selectedDoc = documents.find((doc) => doc.id === deleteId);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;

    const pdfs = files.filter(
      (file) => file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    );
    const invalid = files.filter((file) => !pdfs.includes(file));

    if (invalid.length) {
      enqueueSnackbar('Only PDF files are allowed', { variant: 'warning' });
    }

    if (!pdfs.length) return;

    setUploading(true);
    setUploadProgress(0);

    const dateStr = new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const toLocalDocs = (): DocumentItem[] =>
      pdfs.map((file) => ({
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        size: formatBytes(file.size),
        uploadedAt: dateStr,
        url: URL.createObjectURL(file),
      }));

    try {
      if (documentsError) {
        setLocalDocuments((prev) => [...toLocalDocs(), ...prev]);
        setUploadProgress(100);
      } else {
        for (let index = 0; index < pdfs.length; index += 1) {
          // eslint-disable-next-line no-await-in-loop
          await uploadDocument(pdfs[index], (percent) => {
            const overall = Math.round(((index + percent / 100) / pdfs.length) * 100);
            setUploadProgress(overall);
          });
        }
        await mutateDocuments();
        setUploadProgress(100);
      }

      enqueueSnackbar(
        pdfs.length === 1
          ? `"${pdfs[0].name}" uploaded successfully`
          : `${pdfs.length} files uploaded successfully`,
        { variant: 'success' }
      );
    } catch (error: any) {
      setLocalDocuments((prev) => [...toLocalDocs(), ...prev]);
      enqueueSnackbar(error?.message || 'Saved locally. Upload API is unavailable.', {
        variant: 'warning',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleView = (doc: DocumentItem) => {
    if (!doc.url || doc.url === '#') {
      enqueueSnackbar('Preview is not available for this file', { variant: 'info' });
      return;
    }
    window.open(doc.url, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const isLocal = localDocuments.some((doc) => doc.id === deleteId);
    const previousLocal = localDocuments;

    try {
      if (isLocal) {
        setLocalDocuments((prev) => prev.filter((doc) => doc.id !== deleteId));
      } else {
        await deleteDocument(deleteId);
        await mutateDocuments();
      }
      setDeleteId(null);
      enqueueSnackbar('Media deleted', { variant: 'success' });
    } catch (error: any) {
      setLocalDocuments(previousLocal);
      enqueueSnackbar(error?.message || 'Unable to delete media', { variant: 'error' });
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 0, sm: 2 } }}>
        <CustomBreadcrumbs
          heading="Uploaded Media"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Media' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:cloud-upload-fill" />}
              onClick={handleUploadClick}
              disabled={uploading}
              sx={{
                bgcolor: '#64BFB8',
                color: '#fff',
                '&:hover': { bgcolor: '#4fa8a1' },
              }}
            >
              Upload PDF
            </Button>
          }
          sx={{ mb: 3, mt: 1 }}
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />

        {uploading && (
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
              <Iconify icon="svg-spinners:ring-resize" sx={{ color: '#64BFB8' }} />
              <Typography variant="body2" color="text.secondary">
                Uploading… {uploadProgress}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              sx={{
                borderRadius: 1,
                bgcolor: 'rgba(100,191,184,0.15)',
                '& .MuiLinearProgress-bar': { bgcolor: '#64BFB8' },
              }}
            />
          </Box>
        )}

        {documents.length === 0 && !uploading && !documentsLoading && (
          <Box
            onClick={handleUploadClick}
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 2,
              py: 8,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s',
              '&:hover': { borderColor: '#64BFB8' },
              mb: 3,
            }}
          >
            <Iconify
              icon="eva:cloud-upload-fill"
              sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }}
            />
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              Click to upload PDF files
            </Typography>
            <Typography variant="caption" color="text.disabled">
              Only .pdf files are accepted. These files train your public AI assistant.
            </Typography>
          </Box>
        )}

        <Card
          sx={{
            borderRadius: 2,
            boxShadow: (theme) => theme.customShadows?.z8,
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell sx={{ width: 140 }}>Size</TableCell>
                  <TableCell sx={{ width: 160 }}>Uploaded</TableCell>
                  <TableCell align="right" sx={{ width: 120 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {documentsLoading && !documentsError ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                      <CircularProgress size={28} sx={{ color: '#64BFB8' }} />
                    </TableCell>
                  </TableRow>
                ) : documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                      <Typography variant="body2" color="text.secondary">
                        No media yet — upload your first PDF above.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((doc) => (
                    <TableRow key={doc.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <FileThumbnail file={doc.name} />
                          <Typography variant="subtitle2" noWrap>
                            {doc.name}
                          </Typography>
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {doc.size}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {doc.uploadedAt}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="View">
                          <IconButton onClick={() => handleView(doc)}>
                            <Iconify icon="solar:eye-bold" />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton color="error" onClick={() => setDeleteId(doc.id)}>
                            <Iconify icon="solar:trash-bin-trash-bold" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Container>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Delete media?"
        content={
          selectedDoc
            ? `Are you sure you want to delete "${selectedDoc.name}"? This cannot be undone.`
            : undefined
        }
        action={
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        }
      />
    </>
  );
}
