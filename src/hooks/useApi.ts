import { useState, useCallback } from 'react';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T>;
}

export function useApi<T>(apiFunction: (...args: any[]) => Promise<T>): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: any[]) => {
    const maxRetries = 3;
    let lastError: any;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        setLoading(true);
        setError(null);
        
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        lastError = err;
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        
        // If it's a network error and we have retries left, wait and retry
        if (attempt < maxRetries && (errorMessage.includes('fetch') || errorMessage.includes('Failed to fetch'))) {
          console.log(`🔄 API call failed (attempt ${attempt}/${maxRetries}), retrying in ${attempt * 2} seconds...`);
          await new Promise(resolve => setTimeout(resolve, attempt * 2000)); // Wait 2s, 4s, 6s
          continue;
        }
        
        // Last attempt or non-network error
        setError(errorMessage);
        break;
      }
    }
    
    setLoading(false);
    throw lastError;
  }, [apiFunction]);

  return {
    data,
    loading,
    error,
    execute
  };
}

