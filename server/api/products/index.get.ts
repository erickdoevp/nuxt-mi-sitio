import prisma from "~~/lib/prisma"

export default defineEventHandler(async (event) => {

  const query = getQuery(event);

  let limit = parseInt(query.limit as string) || 5;
  let offset = parseInt(query.offset as string) || 0;

  if( isNaN(limit) || limit <= 1 ) limit = 10;
  if( isNaN(offset) ||  limit <= 0 ) offset = 0;

  const products: Product[] = await prisma.product.findMany({
    take: limit,
    skip: offset
  });

  const total: number = await prisma.product.count();
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(offset / limit) + 1;

  return {
    products: products || [],
    totalPages,
    currentPage,
    perPage: limit,
    total,
  };
});
