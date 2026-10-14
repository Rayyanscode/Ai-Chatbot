'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const { user } = useAuthContext();

  return (
    <Container maxWidth="xl" sx={{ pb: 1, px: { xs: 0, sm: 2 } }}>
      <Box
        sx={{
          position: 'relative',
          bgcolor: '#E3DAEA',
          borderRadius: 3,
          px: { xs: 2, md: 4 },
          py: { xs: 2.5, md: 5 },
          mb: 3,
          mt: 2,
          minHeight: { md: 220 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 2,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ flex: 1, maxWidth: { md: 560 }, position: 'relative', zIndex: 1 }}>
          <Typography
            sx={{
              fontSize: { xs: 20, md: 28 },
              fontWeight: 700,
              color: '#714896',
              lineHeight: { xs: 1.3, md: '36px' },
              mb: 1,
            }}
          >
            Welcome back user👋
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
