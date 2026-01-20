export const useAdminProduct = async ( id: string ) => {

  const { data, error, status, execute, refresh, pending } = await useFetch(`/api/admin/product/${ id }`);

  const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {

    const isCreating = data.id === 0;
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));

    // Si hay archivos cargalos
    if( files ) {
      files.forEach((file) => {
        formData.append('files', file) // files: ['File1', 'File2', 'File3']
      });
    }
    
    if(isCreating) {

      const { product } = await $fetch('/api/admin/product', {
        method: 'POST',
        body: data
      });

      return product;
      
    }

    // Actualizar
    if(!isCreating) {
      try {
        const { product } = await $fetch(`/api/admin/product/${id}`, {
          method: 'PATCH',
          body: formData 
        });

        return product;
      } catch (error) {
        throw createError({
          status: 400,
          message: error instanceof Error ? error.message : 'Unknown error',
        })
      }
    }

  }

  return {
    data,
    error,
    status,
    execute,
    refresh,
    pending,
    createOrUpdate
  }
}