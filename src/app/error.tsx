'use client';

import { useEffect } from 'react';
// sections
import { ErrorBoundaryView } from 'src/sections/error';

// ----------------------------------------------------------------------

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorBoundaryView onReset={reset} />;
}
