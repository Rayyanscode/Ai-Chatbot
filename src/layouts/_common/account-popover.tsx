import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
// routes
import { paths } from 'src/routes/paths';
// hooks
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { varHover } from 'src/components/animate';

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: paths.dashboard.user.profile,
  },
  {
    label: 'Settings',
    linkTo: paths.dashboard.user.account,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { user } = useAuthContext();

  return (
    <>
      <IconButton
        component={m.button}
        // whileTap="tap"
        // whileHover="hover"
        variants={varHover(1.05)}
        // onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          // ...(popover.open && {
          //   background: (theme) =>
          //     `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          // }),
        }}
      >
        <Avatar
          src={user?.picture ?? undefined}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
          }}
        >
          {user?.name?.charAt(0)}
        </Avatar>
      </IconButton>

    </>
  );
}
