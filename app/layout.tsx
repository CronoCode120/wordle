import React from 'react';
import './globals.css';
import { Inter } from 'next/font/google';
import StateContext from '@/context/StateContext';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Wordle',
  description: 'The classic wordle game.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <StateContext>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </StateContext>
  )
}
