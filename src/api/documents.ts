import { useMemo } from 'react';
import useSWR from 'swr';
import axios, { endpoints, fetcher } from 'src/utils/axios';
import type { DocumentItem } from 'src/types/document';

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '-';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  const sizeValue = item.size || item.fileSize;
  return {
    id: String(item._id || item.id),
    name: item.name || item.fileName || item.originalName || 'Untitled.pdf',
    size: typeof sizeValue === 'number' ? formatBytes(sizeValue) : sizeValue || '-',
    uploadedAt: formatDate(item.createdAt || item.uploadedAt || item.created_at),
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

export async function uploadDocument(file: File, onProgress?: (percent: number) => void) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(endpoints.documents.upload, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (event.total && onProgress) {
        onProgress(Math.round((event.loaded * 100) / event.total));
      }
    },
  });

  return response.data;
}

export async function deleteDocument(id: string) {
  const response = await axios.delete(endpoints.documents.delete(id));
  return response.data;
}

export { formatBytes };
