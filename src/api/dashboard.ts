import { useMemo } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import axiosInstance, { endpoints, fetcher, patcher } from 'src/utils/axios';
import { IDashboardTableRow } from 'src/types/dashboard';
import { CaregiverStatus, ICaregiver } from 'src/types/your-circle';

type ApiUser = {
  _id: string;
  name: string;
  email: string;
  role: string;
  isVerified?: boolean;
  status?: string;
};

type UsersListData = {
  docs: ApiUser[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
};

type UsersListResponse = {
  message: string;
  data: UsersListData;
};

function mapUserToTableRow(user: ApiUser): IDashboardTableRow {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    category: user.role,
  };
}

function mapCaregiverStatus(user: ApiUser): CaregiverStatus {
  if (user.status === 'Approved' || user.status === 'Pending') {
    return user.status;
  }

  return user.isVerified ? 'Approved' : 'Pending';
}

function mapUserToCaregiver(user: ApiUser): ICaregiver {
  return {
    _id: user._id,
    name: user.name,
    status: mapCaregiverStatus(user),
  };
}

// DASHBOARD STATS CARD API
export function useGetDashboardStats() {
  const URL = endpoints.dashboard.stats;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      stats: data?.data,
      statsLoading: isLoading,
      statsError: error,
      statsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export type UserListFilter = 'caregiver' | 'primary-user';

type UseGetRecentUsersParams = {
  page?: number;
  limit?: number;
  filter?: UserListFilter;
};

function buildUsersUrl({ page = 1, limit = 10, filter }: UseGetRecentUsersParams) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filter) {
    params.set('filter', filter);
  }

  return `${endpoints.dashboard.recentUsers}?${params.toString()}`;
}

export function useGetRecentUsers({ page = 1, limit = 10, filter }: UseGetRecentUsersParams = {}) {
  const URL = buildUsersUrl({ page, limit, filter });

  const { data, isLoading, error, isValidating, mutate } = useSWR<UsersListResponse>(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      recentUsers: (data?.data?.docs ?? []).map(mapUserToTableRow),
      recentUsersLoading: isLoading,
      recentUsersError: error,
      recentUsersValidating: isValidating,
      recentUsersEmpty: !isLoading && !data?.data?.docs?.length,
      recentUsersMutate: mutate,
      total: data?.data?.totalDocs || 0,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

type UseGetCaregiversParams = {
  page?: number;
  limit?: number;
};

export function useGetCaregivers({ page = 1, limit = 10 }: UseGetCaregiversParams = {}) {
  const URL = buildUsersUrl({ page, limit, filter: 'caregiver' });

  const { data, isLoading, error, isValidating, mutate } = useSWR<UsersListResponse>(URL, fetcher, {
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      caregivers: (data?.data?.docs ?? []).map(mapUserToCaregiver),
      caregiversLoading: isLoading,
      caregiversError: error,
      caregiversValidating: isValidating,
      caregiversEmpty: !isLoading && !data?.data?.docs?.length,
      caregiversMutate: mutate,
      total: data?.data?.totalDocs || 0,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// DELETE USER API
export async function deleteUser(userId: string, role: string) {
  const URL = endpoints.dashboard.deleteUser
    .replace('{userId}', encodeURIComponent(userId))
    .replace('{role}', encodeURIComponent(role));

  const response = await axiosInstance.delete(URL);
  return response.data;
}

// WEEKLY ACCURACY API

export function useGetWeeklyAccuracy(id?: string) {
  const URL = id ? endpoints.dashboard.weeklyAccuracy.replace('{id}', id) : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });
  const memoizedValue = useMemo(
    () => ({
      weeklyAccuracy: data?.data,
      weeklyAccuracyLoading: isLoading,
      weeklyAccuracyError: error,
      weeklyAccuracyValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// CAREGIVER UNLINK API
export function useUnlinkCaregiver(primaryUserId: string, caregiverId: string) {
  const URL = endpoints.dashboard.caregiverUnlink
    .replace('{primaryUserId}', primaryUserId)
    .replace('{caregiverId}', caregiverId);

  const { trigger, isMutating, error, data } = useSWRMutation(URL, patcher);

  const memoizedValue = useMemo(
    () => ({
      unlinkCaregiver: trigger,
      unlinkLoading: isMutating,
      unlinkError: error,
      unlinkData: data,
    }),
    [trigger, isMutating, error, data]
  );

  return memoizedValue;
}

export async function linkPrimaryUser(payload: {
  username: string;
  password: string;
  name: string;
}) {
  const response = await axiosInstance.post(endpoints.dashboard.addPrimaryUser, {
    username: payload.username,
    password: payload.password,
    name: payload.name,
  });
  return response.data;
}

export async function linkExistingPrimaryUser(payload: { username: string; email?: string }) {
  const response = await axiosInstance.post(endpoints.dashboard.linkPrimaryUser, {
    username: payload.username,
    email: payload.email || undefined,
  });
  return response.data;
}

export type PrimaryUserCredentials = {
  username: string;
  password: string;
};

export async function getPrimaryUserCredentials(
  primaryUserId: string
): Promise<PrimaryUserCredentials> {
  const URL = endpoints.dashboard.primaryUserCredentials.replace('{primaryUserId}', primaryUserId);
  const response = await axiosInstance.get(URL);
  const payload = response.data?.data ?? response.data;

  return {
    username: payload?.username ?? payload?.email ?? '',
    password: payload?.password ?? '',
  };
}

export function useGetExerciseStreak(id?: string) {
  const URL = id ? endpoints.dashboard.streak.replace(':id', id) : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      streak: data?.data,
      streakLoading: isLoading,
      streakError: error,
      streakValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
