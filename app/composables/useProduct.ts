export const useProduct = async (slug: string) => {

  const { data, error, status, clear, execute, refresh, pending } = await useFetch(`/api/product/${slug}`);

  return {
    data,
    error,
    status,
    clear,
    execute,
    refresh,
    pending,
    product: data
  }

}