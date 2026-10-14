'use client';

import { m } from 'framer-motion';

// @mui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// layouts
import CompactLayout from 'src/layouts/compact';
// assets
import { SeverErrorIllustration } from 'src/assets/illustrations';
// components
import { RouterLink } from 'src/routes/components';
import { MotionContainer, varBounce } from 'src/components/animate';

// ----------------------------------------------------------------------

type Props = {
  onReset?: () => void;
  /** Skip CompactLayout when rendered inside an existing shell (e.g. dashboard). */
  embedded?: boolean;
};

export default function ErrorBoundaryView({ onReset, embedded }: Props) {
  const content = (
    <MotionContainer>
      <m.div variants={varBounce().in}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Something went wrong!
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <Typography sx={{ color: 'text.secondary' }}>
          There was an error, please try again later.
        </Typography>
      </m.div>

      <m.div variants={varBounce().in}>
        <SeverErrorIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
      </m.div>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
        {onReset && (
          <Button size="large" variant="contained" onClick={onReset}>
            Try Again
          </Button>
        )}

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant={onReset ? 'outlined' : 'contained'}
        >
          Go to Home
        </Button>
      </Stack>
    </MotionContainer>
  );

  if (embedded) {
    return (
      <Stack
        sx={{
          py: 10,
          m: 'auto',
          maxWidth: 400,
          textAlign: 'center',
          justifyContent: 'center',
        }}
      >
        {content}
      </Stack>
    );
  }

  return <CompactLayout>{content}</CompactLayout>;
}
