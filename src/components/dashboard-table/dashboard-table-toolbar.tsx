'use client';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  title: string;
  search: string;
  onSearch: (value: string) => void;
};

export default function DashboardTableToolbar({ title, search, onSearch }: Props) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent="space-between"
      alignItems={{ xs: 'stretch', sm: 'center' }}
      gap={2}
      sx={{ p: { xs: 2, sm: 2.5 } }}
    >
      <Typography
        sx={{
          fontSize: { xs: 16, sm: 18 },
          fontWeight: 600,
          color: 'text.primary',
        }}
      >
        {title}
      </Typography>

      <TextField
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        size="small"
        placeholder="Search"
        sx={{
          width: { xs: '100%', sm: 200 },
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
            bgcolor: 'background.paper',
            borderColor: '#E9EBEE',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" color="#64BFB8" />
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
}
