'use client';

import { useRouter } from 'next/navigation';
// @mui
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
// auth
import { useAuthContext } from 'src/auth/hooks';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

type Props = {
  showBack?: boolean;
};

export default function PublicHeader({ showBack }: Props) {
  const router = useRouter();
  const { authenticated, logout } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(paths.home);
    } catch (error) {
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 1 }}>
        {showBack && (
          <Button
            onClick={() => router.push(paths.home)}
            sx={{ color: 'text.secondary', minWidth: 0, mr: 1 }}
          >
            ← Back
          </Button>
        )}

        <Typography
          variant="h6"
          fontWeight={700}
          onClick={() => router.push(paths.home)}
          sx={{
            flexGrow: 1,
            color: '#64BFB8',
            letterSpacing: '-0.5px',
            cursor: 'pointer',
          }}
        >
          AI Customer Support
        </Typography>

        <Stack direction="row" spacing={1.5}>
          {authenticated ? (
            <>
              <Button
                variant="outlined"
                onClick={() => router.push(paths.dashboard.documents)}
                sx={{
                  borderColor: '#64BFB8',
                  color: '#64BFB8',
                  '&:hover': { borderColor: '#4fa8a1', bgcolor: 'rgba(100,191,184,0.08)' },
                }}
              >
                My Media
              </Button>
              <Button
                variant="contained"
                onClick={handleLogout}
                sx={{
                  bgcolor: '#64BFB8',
                  color: '#fff',
                  '&:hover': { bgcolor: '#4fa8a1' },
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => router.push(paths.auth.jwt.login)}
                sx={{
                  borderColor: '#64BFB8',
                  color: '#64BFB8',
                  '&:hover': { borderColor: '#4fa8a1', bgcolor: 'rgba(100,191,184,0.08)' },
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push(paths.auth.jwt.register)}
                sx={{
                  bgcolor: '#64BFB8',
                  color: '#fff',
                  '&:hover': { bgcolor: '#4fa8a1' },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
