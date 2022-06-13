import useSWR from 'swr';

export default function useAssets() {
  const { data, error, isLoading } = useSWR('api/v1/assets');

  return { assets: data?.data?.assets, error, isLoading };
}
