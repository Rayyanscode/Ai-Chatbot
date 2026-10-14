import { useCallback, useEffect, useState } from 'react';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
//
import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths: Record<string, string> = {
  jwt: paths.auth.jwt.login,
};

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();

  const { authenticated, method, user, loading } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (loading) return;

    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[method];

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
      return;
    }

    if (user?.isVerified === false) {
      const email = user.email ? `?email=${encodeURIComponent(user.email)}` : '';
      router.replace(`${paths.auth.jwt.verifyAccount}${email}`);
      return;
    }

    setChecked(true);
  }, [authenticated, loading, method, router, user]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}
