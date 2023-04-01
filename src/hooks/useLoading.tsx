import { type ReactNode } from 'react';

interface UseLoadingOptions {
  loadingText?: string;
}

export function useLoading(isLoading: boolean, options?: UseLoadingOptions) {
  return function LoadingWrapper({ children }: { children: ReactNode }) {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-4xl font-semibold text-gray-600">{options?.loadingText || 'Loading...'}</div>
        </div>
      );
    }
    return <>{children}</>;
  };
}
