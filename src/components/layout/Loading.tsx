
interface UseLoadingOptions {
  loadingText?: string;
}

export const loading = (options: UseLoadingOptions) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-4xl font-semibold text-gray-600">{options?.loadingText || 'Loading...'}</div>
    </div>
  );
};