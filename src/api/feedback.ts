import { useMemo } from 'react';
import useSWR from 'swr';
import axiosInstance, { endpoints, fetcher } from 'src/utils/axios';
import { IUserFeedback } from 'src/types/user-feedback';

type FeedbackListResponse = {
  message: string;
  data: {
    docs: IUserFeedback[];
    totalDocs: number;
    totalPages: number;
    page: number;
    limit: number;
  };
};

// FEEDBACK STATS API

export function useGetFeedbackStats() {
  const URL = endpoints.feedback.stats;
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

// FEEDBACK LIST API

type UseGetFeedbackListParams = {
  page?: number;
  limit?: number;
};

function buildFeedbackListUrl({ page = 1, limit = 10 }: UseGetFeedbackListParams) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  return `${endpoints.feedback.list}?${params.toString()}`;
}

export function useGetFeedbackList({ page = 1, limit = 10 }: UseGetFeedbackListParams = {}) {
  const URL = buildFeedbackListUrl({ page, limit });

  const { data, isLoading, error, isValidating, mutate } = useSWR<FeedbackListResponse>(
    URL,
    fetcher,
    { keepPreviousData: true }
  );

  const memoizedValue = useMemo(
    () => ({
      feedbacks: data?.data?.docs ?? [],
      feedbacksLoading: isLoading,
      feedbacksError: error,
      feedbacksValidating: isValidating,
      feedbacksMutate: mutate,
      total: data?.data?.totalDocs ?? 0,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// DELETE FEEDBACK API
export async function deleteFeedback(feedbackId: string) {
  const URL = endpoints.feedback.delete.replace('{feedbackId}', feedbackId);
  const response = await axiosInstance.delete(URL);
  return response.data;
}

// SUBMIT FEEDBACK API
type SubmitFeedbackPayload = {
  name: string;
  email: string;
  status: string;
  feedback: string;
};

export async function submitFeedback(data: SubmitFeedbackPayload) {
  const response = await axiosInstance.post(endpoints.feedback.create, data);
  return response.data;
}
