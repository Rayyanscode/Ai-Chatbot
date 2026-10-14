'use client';

import { useState } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FileThumbnail from 'src/components/file-thumbnail';
import { deleteDocument, useGetDocuments } from 'src/api/documents';
import type { DocumentItem } from 'src/types/document';
import DocumentsUpload from '../documents-upload';

// ----------------------------------------------------------------------

export default function DocumentsView() {
  const { enqueueSnackbar } = useSnackbar();
  const { documents, documentsLoading, mutateDocuments } = useGetDocuments();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const selectedDoc = documents.find((doc) => doc.id === deleteId);

  const handleView = (doc: DocumentItem) => {
    if (!doc.url || doc.url === '#') {
      enqueueSnackbar('Preview is not available for this file', { variant: 'info' });
      return;
    }
    window.open(doc.url, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    try {
      await deleteDocument(deleteId);
      await mutateDocuments();
      setDeleteId(null);
      enqueueSnackbar('Media deleted', { variant: 'success' });
    } catch (error: any) {
      enqueueSnackbar(error?.message || 'Unable to delete media', { variant: 'error' });
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 0, sm: 2 } }}>
        <CustomBreadcrumbs
          heading="Uploaded Media"
          links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'Media' }]}
          sx={{ mb: 3, mt: 1 }}
        />

        <Stack spacing={3}>
          <DocumentsUpload onSuccess={() => mutateDocuments()} />

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
                    <TableCell sx={{ width: 140 }}>Status</TableCell>
                    <TableCell sx={{ width: 160 }}>Uploaded</TableCell>
                    <TableCell align="right" sx={{ width: 120 }}>
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {documentsLoading ? (
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
                          <Typography
                            variant="body2"
                            sx={{
                              textTransform: 'capitalize',
                              color:
                                doc.status === 'ready'
                                  ? 'success.main'
                                  : doc.status === 'failed'
                                    ? 'error.main'
                                    : 'text.secondary',
                            }}
                          >
                            {doc.status}
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
        </Stack>
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
