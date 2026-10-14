import { forwardRef } from 'react';
// @mui
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
// routes
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLImageElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const logo = (
      <Box
        ref={ref}
        component="img"
        src="/logo/chatbot.png" // primary logo
        alt="Chatbot Logo"
        onError={(e: any) => {
          e.currentTarget.src = '/logo/chatbot.png'; // fallback PNG
        }}
        sx={{
          width: 70,
          height: 70,
          display: 'inline-block',
          objectFit: 'contain',
          cursor: 'pointer',
          ...sx,
        }}
        {...other}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

Logo.displayName = 'Logo';

export default Logo;
