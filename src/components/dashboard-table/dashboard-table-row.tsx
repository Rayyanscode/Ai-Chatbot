'use client';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { IDashboardTableRow } from 'src/types/dashboard';

// ----------------------------------------------------------------------

type Props = {
  row: IDashboardTableRow;
  showCategory?: boolean;
  onDeleteRow: (id: string, role: string) => void | Promise<void>;
  getDetailsHref?: (id: string, role?: string) => string;
};

export default function DashboardTableRow({
  row,
  showCategory = true,
  onDeleteRow,
  getDetailsHref = (id) => `/dashboard/students/${id}`,
}: Props) {
  const { name, email, category, _id } = row;

  const confirm = useBoolean();
  const popover = usePopover();
  const router = useRouter();

  const handleDelete = async () => {
    if (!category) {
      return;
    }

    try {
      await onDeleteRow(_id, category);
      confirm.onFalse();
      popover.onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableRow sx={{ '&:last-child td': { borderBottom: 0 } }}>
        <TableCell sx={{ pl: 2.5, color: 'text.primary' }}>{name}</TableCell>

        {showCategory && (
          <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{category}</TableCell>
        )}

        <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>{email}</TableCell>

        <TableCell align="center" sx={{ px: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" width={20} sx={{ color: 'text.secondary' }} />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(getDetailsHref(_id, category));
          }}
          sx={{ color: 'text.secondary' }}
        >
          <Iconify icon="solar:eye-bold" sx={{ color: '#CFAB57', mr: 1 }} />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'text.secondary' }}
        >
          <Iconify
            icon="streamline:delete-1-remix"
            sx={{ color: '#C10000', mr: 1, width: 15, height: 12 }}
          />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Want to Remove User?"
        content="Are you sure you want to delete this user? Once deleted, it cannot be recovered."
        action={
          <Button
            variant="contained"
            sx={{ width: '100%', fontWeight: 500, backgroundColor: '#E90004', color: '#FFFFFF' }}
            onClick={handleDelete}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
