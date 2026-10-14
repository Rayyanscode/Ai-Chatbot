'use client';

import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { useInactivityLogout } from '../../hooks';
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';
import { ActionMapType, AuthStateType, AuthUserType } from '../../types';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

enum Types {
  INITIAL = 'INITIAL',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
  SET_USER = 'SET_USER',
}

type Payload = {
  [Types.INITIAL]: {
    user: AuthUserType;
  };
  [Types.LOGIN]: {
    user: AuthUserType;
  };
  [Types.REGISTER]: {
    user: AuthUserType;
  };
  [Types.LOGOUT]: undefined;

  [Types.SET_USER]: {
    user: AuthUserType;
    accessToken: string;
  };
};

type ActionsType = ActionMapType<Payload>[keyof ActionMapType<Payload>];

// ----------------------------------------------------------------------

const initialState: AuthStateType = {
  user: null,
  loading: true,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.REGISTER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === Types.SET_USER) {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);
      // console.log('accessToken', accessToken);
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get(endpoints.auth.me);
        // console.log('initialize response', response);
        const { user } = response.data.data;

        dispatch({
          type: Types.INITIAL,
          payload: {
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          user: null,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email: string, password: string) => {
    const response = await axios.post(endpoints.auth.login, { email, password, role: 'Caregiver' });

    // console.log('login response', response);
    const { accessToken, user } = response.data.loggedInUser;
    setSession(accessToken);

    const userWithEmail = { ...user, email: email || user.email };

    dispatch({
      type: Types.LOGIN,
      payload: {
        user: userWithEmail,
      },
    });

    return userWithEmail;
  }, []);

  // REGISTER
  const register = useCallback(
    async (payload: {
      name: string;
      email: string;
      password: string;
      primaryUserEmail?: string;
      isInvited?: boolean;
    }) => {
      try {
        const response = await axios.post(endpoints.auth.register, payload);
        const { accessToken, user } = response.data;
        sessionStorage.setItem(STORAGE_KEY, accessToken);
        dispatch({ type: Types.REGISTER, payload: { user } });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  useInactivityLogout({
    enabled: !!state.user && !state.loading,
    onLogout: logout,
  });

  const refreshUser = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (!accessToken || !isValidToken(accessToken)) {
        setSession(null);
        dispatch({ type: Types.LOGOUT });
        throw new Error('No valid access token');
      }

      setSession(accessToken);

      const response = await axios.get(endpoints.auth.me);
      const { user } = response.data.data;

      dispatch({
        type: Types.SET_USER,
        payload: {
          user,
          accessToken,
        },
      });

      return user;
    } catch (error) {
      console.error('Failed to refresh user:', error);
      throw error;
    }
  }, []);
  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      register,
      logout,
      refreshUser,
    }),
    [login, logout, register, state.user, status, refreshUser]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
