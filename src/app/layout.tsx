import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Simli',
  description:
    'Our end-to-end API lets you generate video conversations with AI avatars.',
  creator: 'Gudmundur Jonsson (gudj0)',
  keywords: 'AI, video, conversation, avatar, API',
  applicationName: 'Simli',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full w-full'>
      <Head>
        <meta property='og:title' content='Simli' key='title' />
      </Head>
      <body className={`${inter.className} root h-full w-full`} id='root'>
        {children}
        <Analytics />
      <div id='modals'></div>
      </body>
    </html>
  );
}
