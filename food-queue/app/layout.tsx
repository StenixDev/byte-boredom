import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

import { GlobalProvider } from '@/context/global-state';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Order Queue',
  description: 'Fast Food Food Queuing App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col `}
      >
        <Header />
        <main className='flex-1 w-full flex flex-col bg-lime-400'>
          <div className='max-w-6xl w-full mx-auto  text-black py-5 px-3 flex-1 border-x-[5px] border-red-600 bg-lime-300'>
            <GlobalProvider>{children}</GlobalProvider>
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
