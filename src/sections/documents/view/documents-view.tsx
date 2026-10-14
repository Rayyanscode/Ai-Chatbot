'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export default function DocumentsView() {
  return (
    <Container maxWidth="xl" sx={{ pb: 1, px: { xs: 0, sm: 2 } }}>
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
          Documents
        </Typography>
      </Box>
    </Container>
  );
}
