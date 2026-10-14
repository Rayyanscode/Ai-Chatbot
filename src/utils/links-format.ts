export const formatLink = (url: string) => {
  if (!url) return '#';

  // If already has protocol, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Otherwise, prepend https
  return `https://${url}`;
};
