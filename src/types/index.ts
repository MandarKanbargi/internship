// types/index.ts

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface CartItem {
    productId: number;
    quantity: number;
  }
  
  export interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  }
  
  export interface CategoriesResponse {
    categories: string[];
  }