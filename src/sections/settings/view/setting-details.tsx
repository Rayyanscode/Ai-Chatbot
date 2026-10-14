'use client';

import { Box, Container, Divider } from '@mui/material';
import { useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import SettingsTabs from '../setting-tab';
import SettingProfile from '../setting-profile';
import ChangePassword from '../change-password';

export default function SettingDetailsView() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs heading="Settings" />

      <Box sx={{ my: 2 }}>
        <Divider />

        {/* <SettingsTabs value={tab} onChange={setTab} /> */}
      </Box>

      <SettingProfile />
      {/* {tab === 0 ? <SettingProfile /> : <ChangePassword />} */}
    </Container>
  );
}
