'use client';

import { useEffect } from 'react';
// @mui
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// theme
import { primaryFont } from 'src/theme/typography';
// sections
import { ErrorBoundaryView } from 'src/sections/error';

// ----------------------------------------------------------------------

const theme = createTheme({
  typography: {
    fontFamily: primaryFont.style.fontFamily,
  },
});

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en" className={primaryFont.className}>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundaryView onReset={reset} />
        </ThemeProvider>
      </body>
    </html>
  );
}
