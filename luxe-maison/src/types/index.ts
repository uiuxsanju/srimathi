export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string; // category slug
  price: number;
  discount: number; // percentage
  sizes: string[];
  colors: string[];
  stock: number;
  rating: number;
  reviews: Review[];
  images: string[];
  bestseller: boolean;
  trending: boolean;
  featured: boolean;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
  image: string;
  order: number;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface AdminUser {
  email: string;
  password: string;
}

export type SortKey = 'latest' | 'popular' | 'price-asc' | 'price-desc';
