export interface Product {
  id: number | string;
  slug: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  tags: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}
