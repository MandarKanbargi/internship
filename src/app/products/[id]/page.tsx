'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { fetchProductById } from '@/src/services/api';
import { Product } from '@/src/types';
import Header from '@/src/components/ui/Header';
import QuantitySelector from '@/src/components/ui/QuantitySelector';
import MainLayout from '@/src/components/layout/MainLayout';
import { useStore } from '@/src/lib/store';

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;
  const { addToCart } = useStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Calculate discounted price
  const discountedPrice = product 
    ? product.price - (product.price * (product.discountPercentage / 100))
    : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleIncrease = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
      toast.success('Added to cart');
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <Header title="Product Details" showBackButton />
        <div className="flex justify-center items-center h-64">
          <p>Loading product details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <Header title="Product Details" showBackButton />
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error || 'Product not found'}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Header title="Product Details" showBackButton />
      
      <div className="flex flex-col flex-1">
        {/* Image Slider */}
        <div className="relative h-64 w-full bg-gray-100">
          <Image
            src={product.images[selectedImageIndex] || product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>
        
        {/* Thumbnail Selector */}
        {product.images.length > 1 && (
          <div className="flex space-x-2 p-4 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative h-16 w-16 border-2 rounded-md overflow-hidden ${
                  selectedImageIndex === index ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <Image
                  src={image}
                  alt={`${product.title} - image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
        
        {/* Product Info */}
        <div className="p-4 flex-1">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-xl font-semibold">{product.title}</h1>
            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">{product.brand}</p>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-xl font-bold">${discountedPrice.toFixed(2)}</span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="text-sm bg-red-50 text-red-500 px-2 py-0.5 rounded">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>
          
          <p className="text-sm text-gray-700 mb-6">{product.description}</p>
          
          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Quantity:</span>
              <QuantitySelector 
                quantity={quantity}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                maxQuantity={product.stock}
              />
            </div>
            
            <p className="text-sm text-gray-600">
              <span className={product.stock > 10 ? 'text-green-600' : 'text-orange-600'}>
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </p>
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <div className="p-4 border-t">
          <button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white py-3 rounded-lg font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </MainLayout>
  );
}