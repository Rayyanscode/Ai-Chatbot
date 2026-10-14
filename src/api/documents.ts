import { useMemo } from 'react';
import useSWR from 'swr';
import axios, { endpoints, fetcher } from 'src/utils/axios';
import type { DocumentItem } from 'src/types/document';

function formatDate(value?: string | number | Date) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function unwrapList(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.docs)) return payload.data.docs;
  if (Array.isArray(payload?.data?.documents)) return payload.data.documents;
  if (Array.isArray(payload?.documents)) return payload.documents;
  if (Array.isArray(payload?.files)) return payload.files;
  return [];
}

export function mapDocument(item: any): DocumentItem {
  return {
    id: String(item.id || item._id),
    name: item.filename || item.name || item.fileName || 'Untitled.pdf',
    status: item.status || '-',
    chunkCount: item.chunkCount,
    uploadedAt: formatDate(item.uploadedAt || item.createdAt),
    url: item.url || item.fileUrl || item.path || '',
  };
}

export function useGetDocuments() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    endpoints.documents.list,
    fetcher,
    { shouldRetryOnError: false }
  );

  return useMemo(
    () => ({
      documents: unwrapList(data).map(mapDocument),
      documentsLoading: isLoading,
      documentsError: error,
      documentsValidating: isValidating,
      mutateDocuments: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
}

export async function uploadDocument(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(endpoints.documents.upload, formData);

  return response.data;
}

export async function deleteDocument(id: string) {
  const response = await axios.delete(endpoints.documents.delete(id));
  return response.data;
}
