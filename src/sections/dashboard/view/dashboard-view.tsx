'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useAuthContext } from 'src/auth/hooks';
import Iconify from 'src/components/iconify';
import DocumentsUpload from 'src/sections/documents/documents-upload';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const theme = useTheme();
  const { user } = useAuthContext();

  const firstName = (user?.name as string | undefined)?.split(' ')[0] || 'there';
  // Placeholder until documents API is wired — this is the uploaded documents count
  const documentsCount = 24;

  return (
    <Container maxWidth="xl" sx={{ pb: 1, px: { xs: 0, sm: 2 } }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 3,
          px: { xs: 2.5, md: 4 },
          py: { xs: 3, md: 4 },
          mb: 3,
          mt: 2,
          overflow: 'hidden',
          color: 'common.white',
          background: `linear-gradient(135deg, ${theme.palette.primary.darker} 0%, ${theme.palette.primary.dark} 45%, #5B3A8C 100%)`,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -48,
            right: -40,
            width: 220,
            height: 220,
            borderRadius: '50%',
            bgcolor: alpha('#fff', 0.08),
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -60,
            right: 80,
            width: 160,
            height: 160,
            borderRadius: '50%',
            bgcolor: alpha('#fff', 0.06),
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
          <Typography
            variant="overline"
            sx={{ color: alpha('#fff', 0.72), letterSpacing: 1.1, mb: 1, display: 'block' }}
          >
            AI Support Copilot
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 24, md: 32 },
              fontWeight: 700,
              lineHeight: 1.25,
              mb: 1,
            }}
          >
            Welcome back, {firstName}
          </Typography>

          <Typography sx={{ color: alpha('#fff', 0.82), maxWidth: 440 }}>
            Monitor your support workspace, keep knowledge docs fresh, and help the copilot answer
            customers faster.
          </Typography>
        </Box>
      </Box>

      <Card
        sx={{
          p: 2.5,
          mb: 3,
          maxWidth: 320,
          borderRadius: 2,
          boxShadow: theme.customShadows?.z8,
          border: `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        }}
      >
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
              Knowledge base
            </Typography>
            <Typography variant="h4" sx={{ mb: 0.5 }}>
              {documentsCount}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Uploaded documents
            </Typography>
          </Box>

          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.main',
              bgcolor: alpha(theme.palette.primary.main, 0.12),
            }}
          >
            <Iconify icon="solar:document-bold-duotone" width={26} />
          </Box>
        </Stack>
      </Card>

      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Knowledge base
        </Typography>
        <DocumentsUpload />
      </Box>
    </Container>
  );
}
