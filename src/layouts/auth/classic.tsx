// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children, image, title }: Props) {
  const upMd = useResponsive('up', 'md');
  const watermarkImageUrl = '/assets/background/auth/Mindlyft1.png';
  const foregroundLogoUrl = '/assets/background/auth/chatbot2.png';
  const logoImage = '/logo/chatbot.png';

  const renderLogo = (
    <Box
      component="img"
      src={logoImage}
      alt="logo"
      sx={{
        width: { xs: 140, sm: 180 },
        height: 'auto',
        mb: { xs: 2, md: 0 },
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: { xs: 1, md: 420, lg: 500, xl: 580 },
        px: { xs: 2.5, sm: 6, lg: 10 },
        py: { xs: 4, md: 10 },
        background: '#FFFFFF',
        borderTopLeftRadius: { xs: 0, md: 40 },
        borderBottomLeftRadius: { xs: 0, md: 40 },
      }}
    >
      {renderLogo}
      {children}
    </Stack>
  );

  const renderSection = (
    <Box
      sx={{
        position: 'relative',
        flexGrow: 1,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '-40px',
        overflow: 'hidden',
        background: [
          'radial-gradient(ellipse 80% 65% at 100% 0%, rgba(100, 190, 184, 0.3) 0%, transparent 65%)',
          'radial-gradient(ellipse 80% 65% at 0% 100%, rgba(100, 190, 184, 0.3) 0%, transparent 65%)',
          'radial-gradient(ellipse 80% 65% at 0% 0%, rgba(200, 185, 230, 0.2) 0%, transparent 65%)',
          'radial-gradient(ellipse 80% 65% at 100% 100%, rgba(200, 185, 230, 0.2) 0%, transparent 65%)',
          '#F3F1F8',
        ].join(', '),
      }}
    >
      <Box
        component="img"
        src={watermarkImageUrl}
        alt=""
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { md: '50%', lg: '45%' },
          maxWidth: 520,
          opacity: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      />
      <Box
        component="img"
        src={foregroundLogoUrl}
        alt="MindLyft"
        sx={{
          position: 'relative',
          zIndex: 1,
          width: { md: 280, lg: 320 },
          height: 'auto',
        }}
      />
    </Box>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {upMd && renderSection}
      {renderContent}
    </Stack>
  );
}
