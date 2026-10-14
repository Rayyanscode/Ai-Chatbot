'use client';

import type React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { Icon } from '@iconify/react';

type Props = {
  value: number;
  onChange: (newValue: number) => void;
};

export default function SettingsTabs({ value, onChange }: Props) {
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    onChange(newValue);
  };

  return (
    <Box
      sx={{
        borderBottom: '1px solid #E5E7EB',
        px: 1,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{
          style: {
            backgroundColor: '#111827',
            height: '2px',
          },
        }}
        sx={{
          minHeight: '40px',
          '& .MuiTab-root': {
            textTransform: 'none',
            minHeight: '40px',
            fontSize: '14px',
            color: '#6B7280',
            fontWeight: 500,
            px: { xs: 1.5, sm: 2 },
            minWidth: 'unset',
          },
          '& .Mui-selected': {
            color: '#111827',
            fontWeight: 600,
          },
        }}
      >
        <Tab
          icon={<Icon icon="material-symbols:id-card-rounded" width={20} height={20} />}
          iconPosition="start"
          label="Edit Profile"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0.5,
          }}
        />

        <Tab
          icon={<Icon icon="material-symbols:vpn-key" width={20} height={20} />}
          iconPosition="start"
          label="Change Password"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 0.5,
          }}
        />
      </Tabs>
    </Box>
  );
}
