'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllProducts, fetchCategories } from '@/src/services/api';
import { useStore } from '@/src/lib/store';
import Header from '@/src/components/ui/Header';
import CategorySelector from '@/src/components/ui/CategorySelector';
import ProductCard from '@/src/components/ui/ProductCard';
import MainLayout from '@/src/components/layout/MainLayout';

export default function ProductsPage() {
  const { products, filteredProducts, setProducts, filterProductsByCategory } = useStore();
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch categories and products in parallel
        const [categoriesData, productsData] = await Promise.all([
          fetchCategories(),
          fetchAllProducts()
        ]);
        
        setCategories(categoriesData);
        setProducts(productsData.products);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [setProducts]);

  return (
    <MainLayout>
      <Header title="Products" />
      
      Categories
      {/* Categories */}
      {categories.length > 0 && (
      <CategorySelector categories={categories.map((category) => category.name)} />
      )}
      
      {/* Products Grid */}
      <div className="flex-1 px-4 pb-8 ">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 ">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            
            {filteredProducts.length === 10 && (
              <div className="col-span-2 flex justify-center items-center h-64">
                <p className="text-gray-500">No products found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}