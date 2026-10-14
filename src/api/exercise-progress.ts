import { useMemo } from 'react';
import useSWR from 'swr';
import { endpoints, fetcher } from 'src/utils/axios';

// DASHBOARD TABS API

export function useGetDashboardTabs(id?: string) {
  const URL = id ? endpoints.exerciseProgress.tabs.replace('{id}', id) : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      tabs: data?.data,
      tabsLoading: isLoading,
      tabsError: error,
      tabsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// EXERCISE STATS API

export function useGetExerciseStats(id?: string) {
  const URL = id ? endpoints.exerciseProgress.exercisesStats.replace('{id}', id) : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      exercisesStats: data?.data,
      exercisesStatsLoading: isLoading,
      exercisesStatsError: error,
      exercisesStatsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// DAILY REPORT API

function buildDailyReportUrl(id: string, page: number, limit: number, level?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (level && level !== 'none') {
    params.set('level', level);
  }

  return `${endpoints.exerciseProgress.dailyReport.replace('{id}', id)}?${params.toString()}`;
}

export function useGetDailyReport(id?: string, page = 1, limit = 10, level = 'none') {
  const URL = id ? buildDailyReportUrl(id, page, limit, level) : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });
  const memoizedValue = useMemo(
    () => ({
      dailyReport: data?.data,
      dailyReportLoading: isLoading,
      dailyReportError: error,
      dailyReportValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// PROGRESS CHART API

export function useGetChartData(id: string, view: string, from: string, to: string) {
  const URL = id
    ? `${endpoints.exerciseProgress.chartData}?userId=${id}&view=${view}&from=${from}&to=${to}`
    : null;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
  });
  const memoizedValue = useMemo(
    () => ({
      chartData: data?.data,
      chartDataLoading: isLoading,
      chartDataError: error,
      chartDataValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}