import prisma from '../lib/prisma.ts';
import brcyrpt from 'bcryptjs';
import { siteReviews } from './site-reviews.seed.ts';
import { products } from './product.seed.ts';
import { users } from './users.seed.ts';
import { productReviews } from './product-reviews.seed.ts'

async function seedDatabase() {

  // Purgar base de datos
  await prisma.productReview.deleteMany();
  await prisma.product.deleteMany();
  await prisma.siteReview.deleteMany();
  await prisma.user.deleteMany();

  // Hash de contraseñas de usuarios
  const usersWithHashedPasswords = users.map((user) => ({
    ...user,
    password: brcyrpt.hashSync(user.password, brcyrpt.genSaltSync(10)),
  }));

  // Insertar registros
  await prisma.siteReview.createMany({
    data: siteReviews,
  });


  // Insertar productos
  await prisma.product.createMany({
    data: products
  });

  // Insertar usuarios
  await prisma.user.createMany({
    data: usersWithHashedPasswords
  });

  const productsCreated = await prisma.product.findMany();
  const usersCreated = await prisma.user.findMany();
  // TODO: usuarios
  
  const productReviewsCreated = productReviews.map(review => ({
    ...review,
    productId: productsCreated[Math.floor(Math.random() * products.length)].id,
    userId: usersCreated[Math.floor(Math.random() * users.length)].id,
  }));

  await prisma.productReview.createMany({
    data: productReviewsCreated,
  });

  console.log('Database seeded successfully');
}

seedDatabase();
