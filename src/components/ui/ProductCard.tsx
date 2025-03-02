// components/ui/ProductCard.tsx

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Calculate discounted price
  const discountedPrice = product.price - (product.price * (product.discountPercentage / 100));
  
  return (
    <Link href={`/products/${product.id}`}>
      <div className="rounded-lg overflow-hidden shadow-md bg-white h-full flex flex-col">
        <div className="relative h-48 w-full bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-700 mb-1 truncate">{product.title}</h3>
            <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm">${discountedPrice.toFixed(2)}</p>
              {product.discountPercentage > 0 && (
                <p className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</p>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-500">★</span>
              <span className="text-xs font-medium">{product.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;