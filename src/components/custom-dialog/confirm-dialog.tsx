// @mui
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
//
import Iconify from 'src/components/iconify';
import { ConfirmDialogProps } from './types';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
          <Typography variant="h6" sx={{ color: '#101828', flex: 1, pr: 1 }}>
            {title}
          </Typography>

          <IconButton onClick={onClose} size="small" sx={{ color: '#667085', mt: -0.5, mr: -0.5 }}>
            <Iconify icon="mingcute:close-line" width={20} />
          </IconButton>
        </Stack>

        {content && (
          <Typography variant="body2" sx={{ color: '#667085', mt: 1 }}>
            {content}
          </Typography>
        )}
      </DialogTitle>

      <DialogActions sx={{ px: 3, pt: 3, pb: 3, justifyContent: 'center' }}>{action}</DialogActions>
    </Dialog>
  );
}
