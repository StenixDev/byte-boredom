import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/header';
import Footer from './components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Food Queue',
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-lime-300`}
      >
        <div className='min-h-screen flex flex-col'>
          <Header />

          <main className='flex flex-col flex-1 w-6xl mx-auto'>
            <div className='flex-1 text-black py-5 px-3'>{children}</div>
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
