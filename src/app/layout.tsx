// app/layout.tsx

import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Lato } from 'next/font/google';

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'Next.js 15 E-Commerce App with TypeScript and TailwindCSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}