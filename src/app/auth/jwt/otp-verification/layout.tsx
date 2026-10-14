'use client';

// components
import AuthClassicLayout from 'src/layouts/auth/classic';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  // No GuestGuard: unverified authenticated users must reach OTP verification
  return <AuthClassicLayout>{children}</AuthClassicLayout>;
}
