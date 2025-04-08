
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling over-ear headphones with 40-hour battery life and comfortable design.',
    price: 199.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    category: 'electronics',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featuredProduct: true,
  },
  {
    id: '2',
    name: 'Smartphone Pro Max',
    description: 'Latest generation smartphone with 6.7" OLED display, 5G connectivity, and advanced camera system.',
    price: 999.99,
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000',
    category: 'electronics',
    rating: 4.9,
    reviews: 253,
    inStock: true,
    featuredProduct: true,
  },
  {
    id: '3',
    name: 'Casual Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors. Perfect for everyday wear.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000',
    category: 'clothing',
    rating: 4.5,
    reviews: 89,
    inStock: true,
  },
  {
    id: '4',
    name: 'Smart Fitness Watch',
    description: 'Track your workouts, heart rate, sleep patterns and more with this water-resistant fitness tracker.',
    price: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?q=80&w=1000',
    category: 'electronics',
    rating: 4.6,
    reviews: 176,
    inStock: true,
  },
  {
    id: '5',
    name: 'Designer Sunglasses',
    description: 'UV-protected polarized sunglasses with durable metal frame and sleek design.',
    price: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1000',
    category: 'clothing',
    rating: 4.4,
    reviews: 62,
    inStock: true,
  },
  {
    id: '6',
    name: 'Premium Coffee Maker',
    description: 'Programmable drip coffee maker with thermal carafe that keeps coffee hot for hours.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1570087935421-5ef75fbce5c3?q=80&w=1000',
    category: 'home',
    rating: 4.7,
    reviews: 137,
    inStock: true,
    featuredProduct: true,
  },
  {
    id: '7',
    name: 'Bestselling Novel',
    description: 'The latest page-turner from acclaimed author, already topping the charts worldwide.',
    price: 18.99,
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000',
    category: 'books',
    rating: 4.9,
    reviews: 215,
    inStock: true,
  },
  {
    id: '8',
    name: 'Organic Face Serum',
    description: 'Revitalizing facial serum with vitamin C and hyaluronic acid for radiant skin.',
    price: 59.99,
    imageUrl: 'https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=1000',
    category: 'beauty',
    rating: 4.8,
    reviews: 94,
    inStock: true,
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featuredProduct);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};
