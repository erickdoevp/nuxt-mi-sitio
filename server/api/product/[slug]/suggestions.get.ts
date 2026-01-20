import prisma from "~~/lib/prisma";

export default defineEventHandler(async event => {

  const { slug } = getRouterParams(event);
  if( !slug ) return null;

  const product = await prisma.product.findUnique({
    where: { slug }, 
  });

  await new Promise((resolve) => setTimeout(resolve, 2500));

  if( !product ) {
    throw createError({
      statusCode: 404,
      statusMessage: 'not found',
      message: 'Product with slug not found',
      data: { slug, state: process.env.STAGE },
      stack: process.env.STAGE !== 'production' ? new Error().stack : '',
    });
  };

  const suggestions = await prisma.product.findMany({
    where: {
      tags: {
        hasSome: product.tags,
      },
      NOT: {
        id: product.id,
      }
    },
    take: 3
  })

  return suggestions;
  
});