const BASE_URL = 'https://www.googleapis.com/books/v1';
const TIMEOUT = 10000;

const fetchWithTimeout = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    throw error;
  }
};

export const client = {
  get: async <T>(endpoint: string, config?: { params?: Record<string, string> }): Promise<{ data: T }> => {
    let url = `${BASE_URL}${endpoint}`;
    if (config?.params) {
      const searchParams = new URLSearchParams(config.params);
      url += `?${searchParams.toString()}`;
    }

    try {
      const response = await fetchWithTimeout(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return { data };
    } catch (error) {
      if (error instanceof Error && error.message.includes('timed out')) {
        throw error;
      }
      if (error instanceof Error && (error.message.includes('Failed to fetch') || error.message.includes('Network'))) {
        throw new Error('Network error. Check your connection and try again.');
      }
      throw error;
    }
  },
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('timed out')) {
      return 'Request timed out. Please try again.';
    }
    if (error.message.includes('Network') || error.message.includes('Failed to fetch')) {
      return 'Network error. Check your connection and try again.';
    }
  }
  return 'Something went wrong. Please try again.';
};
