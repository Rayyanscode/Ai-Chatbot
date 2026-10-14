import { useMemo } from 'react';
import useSWR from 'swr';
import axios, { endpoints, fetcher } from 'src/utils/axios';
import { MOCK_BUSINESSES, MOCK_BUSINESS_MAP } from 'src/_mock/_business';
import type { Business, ChatMessage } from 'src/types/business';

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

function unwrapList(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.docs)) return payload.data.docs;
  if (Array.isArray(payload?.data?.businesses)) return payload.data.businesses;
  if (Array.isArray(payload?.businesses)) return payload.businesses;
  return [];
}

function unwrapItem(payload: any): any | null {
  if (!payload) return null;
  if (payload?.data && !Array.isArray(payload.data)) {
    if (payload.data.business) return payload.data.business;
    return payload.data;
  }
  if (payload.business) return payload.business;
  if (payload.id || payload._id || payload.businessName || payload.name) return payload;
  return null;
}

export function mapBusiness(item: any): Business {
  const name = item.businessName || item.name || 'Business';
  return {
    id: String(item._id || item.id),
    name,
    category: item.category || 'Business',
    description: item.description || item.contactInfo || '',
    avatar: item.avatar || initials(name) || 'B',
    location: item.location || item.address || item.city || '',
    publicKey: item.publicKey || item.public_key || undefined,
    fullDescription: item.fullDescription || item.about || item.description || item.contactInfo,
    email: item.email || item.contactEmail,
    phone: item.phone || item.contactInfo,
    website: item.website,
    tags: item.tags || [],
    contactInfo: item.contactInfo,
  };
}

export function useGetBusinesses() {
  const { data, error, isLoading, isValidating } = useSWR(endpoints.businesses.list, fetcher, {
    shouldRetryOnError: false,
  });

  return useMemo(() => {
    const mapped = unwrapList(data).map(mapBusiness);
    const businesses = mapped.length ? mapped : error ? MOCK_BUSINESSES : isLoading ? [] : MOCK_BUSINESSES;

    return {
      businesses,
      businessesLoading: isLoading && !mapped.length,
      businessesError: error,
      businessesValidating: isValidating,
      usingFallback: Boolean(error) || (!mapped.length && !isLoading),
    };
  }, [data, error, isLoading, isValidating]);
}

export function useGetBusiness(id?: string) {
  const { data, error, isLoading } = useSWR(
    id ? endpoints.businesses.detail(id) : null,
    fetcher,
    { shouldRetryOnError: false }
  );

  return useMemo(() => {
    const mapped = unwrapItem(data) ? mapBusiness(unwrapItem(data)) : null;
    const fallback = id ? MOCK_BUSINESS_MAP[id] || null : null;

    return {
      business: mapped || fallback,
      businessLoading: Boolean(id) && isLoading && !mapped,
      businessError: error,
    };
  }, [data, error, id, isLoading]);
}

export async function sendBusinessChat(
  publicKey: string,
  message: string,
  history: ChatMessage[] = []
) {
  const response = await axios.post(endpoints.businesses.chat(publicKey), {
    message,
    history: history.map((item) => ({
      role: item.role,
      content: item.content,
    })),
  });

  const payload = response.data;
  return (
    payload?.answer ||
    payload?.reply ||
    payload?.message ||
    payload?.data?.answer ||
    payload?.data?.reply ||
    payload?.data?.message ||
    payload?.data?.content ||
    payload?.content ||
    ''
  );
}
