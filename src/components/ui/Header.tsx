// components/ui/Header.tsx

import React from 'react';
import { ChevronLeft, ShoppingBag } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleBack = () => {
    router.back();
  };
  
  return (
    <header className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton && (
            <button 
              onClick={handleBack} 
              className="mr-2 p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>
          )}
          <h1 className="text-xl font-semibold">{title}</h1>
        </div>
        <div>
          <button className="p-1 rounded-full hover:bg-gray-100">
            <ShoppingBag size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;