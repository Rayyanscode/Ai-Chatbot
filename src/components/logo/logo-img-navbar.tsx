import Box, { BoxProps } from '@mui/material/Box';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

const LOGO_SRC = '/logo/chatbot.png';

export default function LogoImgNavbar({ sx, ...other }: BoxProps) {
  return (
    <Box
      component={RouterLink}
      href={paths.dashboard.root}
      sx={{ display: 'contents', cursor: 'pointer' }}
    >
      <Box
        component="img"
        src={LOGO_SRC}
        alt="logo"
        sx={{
          width: 180,
          height: 80,
          display: 'inline-flex',
          ...sx,
        }}
        {...other}
      />
    </Box>
  );
}
