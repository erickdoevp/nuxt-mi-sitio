import prisma from "~~/lib/prisma";

export default defineEventHandler(async event => {

  const session = await getUserSession(event);

  const slug = getRouterParam(event, 'slug');
  const userId = session.user?.id || null;

  const productReviews = await prisma.productReview.findMany({
    where: {
      product: {
        slug: slug
      },
    },
    take: 10,
    orderBy: {
      createdAt: 'desc'
    }
  });

  const userHasReview = await prisma.productReview.findFirst({
    where: {
      product: {
        slug
      },
      userId: Number(userId)
    }
  });

  return {
    productReviews,
    hasUserPostedReview: !!userHasReview,
  }

});