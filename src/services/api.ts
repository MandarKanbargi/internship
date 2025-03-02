// services/api.ts

import { Product, ProductsResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

export const fetchAllProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products?limit=100`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch product details');
  }
  
  return response.json();
};

export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL}/products/categories`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

export const fetchProductsByCategory = async (category: string): Promise<ProductsResponse> => {
  const response = await fetch(`${BASE_URL}/products/category/${category}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch products in category');
  }
  
  return response.json();
};