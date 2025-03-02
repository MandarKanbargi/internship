// components/layout/MainLayout.tsx

import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 flex flex-col max-w-md mx-auto w-full bg-white shadow-sm">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;