import type { Metadata } from 'next';
import { inter } from './fonts/google/inter';
import { moranga } from './fonts/local/moranga';
import './globals.css';
export const metadata: Metadata = {
  title: 'simplecx by Retink (Beta)',
  description: 'Multiformat content creation now super simple with simplecx',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href={'/favicon.svg'}></link>
      <body className={`${moranga.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}