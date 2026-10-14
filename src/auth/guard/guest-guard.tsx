import { useCallback, useEffect } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: Props) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || paths.dashboard.documents;

  const { authenticated, user } = useAuthContext();

  const check = useCallback(() => {
    // Unverified users may stay on auth pages to complete verification
    if (authenticated && user?.isVerified !== false) {
      router.replace(returnTo);
    }
  }, [authenticated, user, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
