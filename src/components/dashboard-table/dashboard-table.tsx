'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import { Box, Link, Typography } from '@mui/material';
import Scrollbar from 'src/components/scrollbar';
import {
  TableNoData,
  TableHeadCustom,
  useTable,
  TablePaginationCustom,
} from 'src/components/table';
import { IDashboardTableRow } from 'src/types/dashboard';
import Iconify from 'src/components/iconify';
import RouterLink from 'src/routes/components/router-link';
import { useSnackbar } from 'src/components/snackbar';
import { deleteUser, useGetRecentUsers, UserListFilter } from 'src/api/dashboard';
import DashboardTableRow from './dashboard-table-row';
import DashboardTableToolbar from './dashboard-table-toolbar';

// ----------------------------------------------------------------------

const ROWS_PER_PAGE = 10;

type Props = {
  title?: string;
  /**
   * API filter for user type. When set, the "Category" column is hidden.
   */
  filter?: UserListFilter;
  /**
   * Show the "View All" footer button (used on the dashboard overview).
   */
  showViewAll?: boolean;
  viewAllHref?: string;
  /**
   * Builds the destination for a row's "View" action. Defaults to the
   * student details route used by the dashboard overview.
   */
  getDetailsHref?: (id: string, role?: string) => string;
};

export default function DashboardTable({
  title = 'Total Users',
  filter,
  showViewAll = false,
  viewAllHref = '#',
  getDetailsHref,
}: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');

  const table = useTable({ defaultRowsPerPage: ROWS_PER_PAGE });

  const { recentUsers, recentUsersMutate, total } = useGetRecentUsers({
    page: table.page + 1,
    limit: ROWS_PER_PAGE,
    filter,
  });

  useEffect(() => {
    table.onResetPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    table.onResetPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const showCategoryColumn = !filter;

  const tableHead = useMemo(
    () =>
      [
        { id: 'name', label: 'Name', width: 200, minWidth: 150, pl: 2.5 },
        showCategoryColumn
          ? { id: 'category', label: 'Category', width: 160, minWidth: 140 }
          : null,
        { id: 'email', label: 'Email', width: 220, minWidth: 200 },
        { id: 'action', label: 'Setting', width: 80, minWidth: 80, align: 'center' },
      ].filter(Boolean) as { id: string; label: string }[],
    [showCategoryColumn]
  );

  const filteredData: IDashboardTableRow[] = useMemo(() => {
    if (!search.trim()) {
      return recentUsers;
    }

    const query = search.toLowerCase();

    return recentUsers.filter(
      (row) =>
        row.name.toLowerCase().includes(query) ||
        row.email.toLowerCase().includes(query) ||
        (row.category || '').toLowerCase().includes(query)
    );
  }, [recentUsers, search]);

  const notFound = !filteredData.length;

  const handleDeleteRow = useCallback(
    async (id: string, role: string) => {
      try {
        const response = await deleteUser(id, role);
        table.onUpdatePageDeleteRow(filteredData.length);
        await recentUsersMutate();
        enqueueSnackbar(response.message || 'User deleted successfully', {
          variant: 'success',
        });
      } catch (error) {
        enqueueSnackbar('Unable to delete user', { variant: 'error' });
      }
    },
    [enqueueSnackbar, recentUsersMutate, filteredData.length, table]
  );

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: 'background.paper',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
      }}
    >
      <DashboardTableToolbar title={title} search={search} onSearch={setSearch} />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size="medium" sx={{ minWidth: 720 }}>
            <TableHeadCustom headLabel={tableHead} />

            <TableBody>
              {filteredData.map((row: IDashboardTableRow) => (
                <DashboardTableRow
                  key={row._id}
                  row={row}
                  showCategory={showCategoryColumn}
                  onDeleteRow={handleDeleteRow}
                  getDetailsHref={getDetailsHref}
                />
              ))}

              <TableNoData notFound={notFound} />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={total}
        page={table.page}
        rowsPerPage={ROWS_PER_PAGE}
        onPageChange={table.onChangePage}
        rowsPerPageOptions={[]}
      />

      {showViewAll && (
        <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            component={RouterLink}
            href={viewAllHref}
            underline="none"
            sx={{
              backgroundColor: '#64BFB8',
              '&:hover': { backgroundColor: '#64BFB8' },
              px: 2.5,
              py: 1,
              color: 'white',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              transition: 'background-color 0.2s',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>View All</Typography>
            <Iconify icon="mdi-light:arrow-right" width={20} sx={{ color: 'white' }} />
          </Link>
        </Box>
      )}
    </Box>
  );
}
