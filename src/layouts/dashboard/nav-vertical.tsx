'use client';

import { useEffect } from 'react';
// @mui
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// components
import LogoImgNavbar from 'src/components/logo/logo-img-navbar';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { NavSectionVertical } from 'src/components/nav-section';
import { useAuthContext } from 'src/auth/hooks';
import { usePathname, useRouter } from 'src/routes/hooks';
import { useSnackbar } from 'src/components/snackbar';
//
import { NAV } from '../config-layout';
import { useNavData } from './config-navigation';
// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { logout } = useAuthContext();
  const { user } = useMockedUser();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const lgUp = useResponsive('up', 'lg');

  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Stack direction="column" justifyContent="space-between" height="100%">
      <Scrollbar
        sx={{
          height: 1,
          '& .simplebar-content': {
            height: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        <LogoImgNavbar sx={{ mt: 3, ml: 3, mb: 3.5 }} />
        <NavSectionVertical
          data={navData}
          config={{
            currentRole: user?.role || 'admin',
          }}
        />
      </Scrollbar>
      <List disablePadding sx={{ px: 2, pb: 2 }}>
        <ListItemButton
          alignItems="center"
          sx={{
            minHeight: 44,
            padding: '4px 8px 4px 12px',
            borderRadius: 1,
            color: 'text.secondary',
            '&:hover': {
              bgcolor: 'action.hover',
            },
          }}
          onClick={handleLogout}
        >
          <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
            <Iconify
              icon="simple-line-icons:logout"
              sx={{ width: 24, height: 22, color: '#64BFB8' }}
            />
          </ListItemIcon>

          <Typography>Logout</Typography>
        </ListItemButton>
      </List>
    </Stack>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
      }}
    >
      {/* <NavToggleButton /> */}

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.W_VERTICAL,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
