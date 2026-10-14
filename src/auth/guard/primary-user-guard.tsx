'use client';

import { useEffect } from 'react';
// routes
import { usePathname, useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// Caregivers without a linked primary user may only see the dashboard root and settings.
// Any other dashboard page (including direct URL entry) redirects back to the root.
export default function PrimaryUserGuard({ children }: Props) {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  const normalizedPath = pathname?.replace(/\/+$/, '') || '/';
  const allowedWithoutPrimaryUser = [paths.dashboard.root, paths.dashboard.settings];
  const blocked = !user?.primaryUserId && !allowedWithoutPrimaryUser.includes(normalizedPath);

  useEffect(() => {
    if (blocked) {
      router.replace(paths.dashboard.root);
    }
  }, [blocked, router]);

  if (blocked) {
    return null;
  }

  return <>{children}</>;
}
