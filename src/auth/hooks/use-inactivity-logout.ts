'use client';

import { useCallback, useEffect, useRef } from 'react';
// routes
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const INACTIVITY_MS = 30 * 60 * 1000; // 30 minutes
const LAST_ACTIVITY_KEY = 'lastActivityAt';
const THROTTLE_MS = 1000;

const ACTIVITY_EVENTS = [
  'mousedown',
  'mousemove',
  'keydown',
  'scroll',
  'touchstart',
  'click',
] as const;

// ----------------------------------------------------------------------

type Props = {
  enabled: boolean;
  onLogout: () => void | Promise<void>;
  /** Login route to redirect after logout */
  loginPath?: string;
};

export function useInactivityLogout({
  enabled,
  onLogout,
  loginPath = paths.auth.jwt.login,
}: Props) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onLogoutRef = useRef(onLogout);

  onLogoutRef.current = onLogout;

  const clearAuthAndRedirect = useCallback(async () => {
    sessionStorage.removeItem(LAST_ACTIVITY_KEY);
    await onLogoutRef.current();
    window.location.href = loginPath;
  }, [loginPath]);

  const scheduleLogout = useCallback(
    (delayMs: number) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        clearAuthAndRedirect();
      }, delayMs);
    },
    [clearAuthAndRedirect]
  );

  const resetTimer = useCallback(() => {
    if (!enabled) {
      return;
    }

    sessionStorage.setItem(LAST_ACTIVITY_KEY, String(Date.now()));
    scheduleLogout(INACTIVITY_MS);
  }, [enabled, scheduleLogout]);

  const resumeOrLogout = useCallback(() => {
    const stored = Number(sessionStorage.getItem(LAST_ACTIVITY_KEY) || 0);

    if (!stored) {
      resetTimer();
      return;
    }

    const elapsed = Date.now() - stored;

    if (elapsed >= INACTIVITY_MS) {
      clearAuthAndRedirect();
      return;
    }

    scheduleLogout(INACTIVITY_MS - elapsed);
  }, [clearAuthAndRedirect, resetTimer, scheduleLogout]);

  useEffect(() => {
    if (!enabled) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      return undefined;
    }

    resumeOrLogout();

    let throttleTimeout: ReturnType<typeof setTimeout> | null = null;

    const onActivity = () => {
      if (throttleTimeout) {
        return;
      }

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, THROTTLE_MS);

      resetTimer();
    };

    ACTIVITY_EVENTS.forEach((event) => {
      window.addEventListener(event, onActivity, { passive: true });
    });

    const onVisibilityChange = () => {
      if (document.visibilityState !== 'visible') {
        return;
      }

      resumeOrLogout();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
      ACTIVITY_EVENTS.forEach((event) => {
        window.removeEventListener(event, onActivity);
      });
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [enabled, resetTimer, resumeOrLogout]);
}
