export const ensureHttps = (url: string | null | undefined): string | null => {
  if (!url) return null;
  return url.startsWith('http://') ? url.replace('http://', 'https://') : url;
};
