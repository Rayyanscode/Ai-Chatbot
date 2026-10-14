'use client';

// auth
import { AuthGuard, PrimaryUserGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <AuthGuard>
      <DashboardLayout>
        <PrimaryUserGuard>{children}</PrimaryUserGuard>
      </DashboardLayout>
    </AuthGuard>
  );
}
