'use client';

import { useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
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
// routes
import { paths } from 'src/routes/paths';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FileThumbnail from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

type DocumentItem = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  url: string;
};

const MOCK_DOCUMENTS: DocumentItem[] = [
  {
    id: '1',
    name: 'Product FAQ.pdf',
    size: '1.2 MB',
    uploadedAt: '12 Oct 2026',
    url: '#',
  },
  {
    id: '2',
    name: 'Refund Policy.docx',
    size: '840 KB',
    uploadedAt: '10 Oct 2026',
    url: '#',
  },
  {
    id: '3',
    name: 'Shipping Guidelines.pdf',
    size: '2.4 MB',
    uploadedAt: '08 Oct 2026',
    url: '#',
  },
  {
    id: '4',
    name: 'Support Scripts.pdf',
    size: '1.8 MB',
    uploadedAt: '05 Oct 2026',
    url: '#',
  },
];

// ----------------------------------------------------------------------

export default function DocumentsView() {
  const { enqueueSnackbar } = useSnackbar();

  const [documents, setDocuments] = useState<DocumentItem[]>(MOCK_DOCUMENTS);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const selectedDoc = documents.find((doc) => doc.id === deleteId);

  const handleView = (doc: DocumentItem) => {
    if (!doc.url || doc.url === '#') {
      enqueueSnackbar('Document preview will be available after API integration', {
        variant: 'info',
      });
      return;
    }

    window.open(doc.url, '_blank', 'noopener,noreferrer');
  };

  const handleDelete = () => {
    if (!deleteId) return;

    setDocuments((prev) => prev.filter((doc) => doc.id !== deleteId));
    setDeleteId(null);
    enqueueSnackbar('Document deleted', { variant: 'success' });
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ pb: 3, px: { xs: 0, sm: 2 } }}>
        <CustomBreadcrumbs
          heading="Documents"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Documents' },
          ]}
          sx={{ mb: 3, mt: 1 }}
        />

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
                {documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center" sx={{ py: 8 }}>
                      <Typography variant="body2" color="text.secondary">
                        No documents yet
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
        title="Delete document?"
        content={
          selectedDoc
            ? `Are you sure you want to delete “${selectedDoc.name}”? This cannot be undone.`
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
