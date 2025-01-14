import type { Metadata } from "next";
import './globals.css';
import { Roboto_Condensed } from 'next/font/google';

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'Magic Mirror',
  description: 'A Next.js based Magic Mirror interface',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={robotoCondensed.className}>{children}</body>
    </html>
  );
}
