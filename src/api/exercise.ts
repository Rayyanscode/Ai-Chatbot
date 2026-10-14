import { useMemo } from 'react';

import useSWR from 'swr';

import useSWRMutation from 'swr/mutation';

import axiosInstance, { endpoints, fetcher } from 'src/utils/axios';

import { IApiDifficulty, IExerciseDetails, IExerciseListItem } from 'src/types/exercise-template';

type ExerciseListResponse = {
  message: string;

  data: IExerciseListItem[];
};

type ExerciseDetailsResponse = {
  message: string;

  data: IExerciseDetails;
};

export type ExerciseUpdateInput = {
  isActive?: boolean;

  quickNotes?: string;

  difficulty?: IApiDifficulty[];

  tutorial?: File;

  gameImages?: File[];
};

// EXERCISE LIST API

export function useGetExerciseList() {
  const URL = endpoints.exercise.list;

  const { data, isLoading, error, isValidating, mutate } = useSWR<ExerciseListResponse>(
    URL,
    fetcher
  );

  const memoizedValue = useMemo(
    () => ({
      exercises: data?.data ?? [],

      exercisesLoading: isLoading,

      exercisesError: error,

      exercisesValidating: isValidating,

      exercisesMutate: mutate,
    }),

    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// GET EXERCISE DETAILS BY ID

export function useGetExerciseDetails(exerciseId: string) {
  const URL = exerciseId ? endpoints.exercise.details.replace('{exerciseId}', exerciseId) : null;

  const { data, isLoading, error, isValidating } = useSWR<ExerciseDetailsResponse>(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      exercise: data?.data,

      exerciseLoading: isLoading,

      exerciseError: error,

      exerciseValidating: isValidating,
    }),

    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function buildExerciseFormData(data: ExerciseUpdateInput) {
  const formData = new FormData();

  if (data.isActive !== undefined) {
    formData.append('isActive', String(data.isActive));
  }

  if (data.quickNotes !== undefined) {
    formData.append('quickNotes', data.quickNotes);
  }

  if (data.difficulty) {
    formData.append('difficulty', JSON.stringify(data.difficulty));
  }

  if (data.tutorial) {
    formData.append('tutorial', data.tutorial);
  }

  if (data.gameImages?.length) {
    data.gameImages.forEach((file) => {
      formData.append('gameImages', file);
    });
  }

  return formData;
}

async function patchExerciseFormData(
  url: string,

  { arg }: { arg: ExerciseUpdateInput }
): Promise<ExerciseDetailsResponse> {
  const response = await axiosInstance.patch(url, buildExerciseFormData(arg));

  return response.data;
}

// UPDATE EXERCISE API (FormData via SWR mutation)

export function useUpdateExercise(exerciseId: string) {
  const url = endpoints.exercise.update.replace('{exerciseId}', exerciseId);

  const { trigger, isMutating, error, data } = useSWRMutation<
    ExerciseDetailsResponse,
    unknown,
    string,
    ExerciseUpdateInput
  >(url, patchExerciseFormData);

  const memoizedValue = useMemo(
    () => ({
      updateExercise: trigger,

      exerciseUpdating: isMutating,

      updateError: error,

      updatedExercise: data?.data,
    }),

    [trigger, isMutating, error, data]
  );

  return memoizedValue;
}

// DELETE EXERCISE API
export async function deleteExercise(exerciseId: string) {
  const URL = endpoints.exercise.delete.replace('{exerciseId}', exerciseId);
  const response = await axiosInstance.delete(URL);
  return response.data;
}
