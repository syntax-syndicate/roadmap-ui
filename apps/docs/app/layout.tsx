import '@repo/tailwind-config/globals.css';
import { Toaster } from '@repo/shadcn-ui/components/ui/sonner';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
        <Toaster />
      </body>
    </html>
  );
}
