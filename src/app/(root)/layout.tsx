import type { Metadata } from 'next';
import { MessageProvider } from '@/context/messages/MessageContext';
import '../globals.css';
import Footer from '../components/Footer';
import { Header } from '../components/Header';
import Chatbot from '../components/Chatbot';

export const metadata: Metadata = {
  title: 'simplecx by Retink',
  description: '"simplecx makes content creation easy with AI, helping businesses and creators save time, stay consistent, and get better results.',
  icons: {
    icon: "/logo.svg", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MessageProvider>
      <div className="bg-black">
        <Header />
        <Chatbot />
        <main className='pt-20'>{children}</main>
        <Footer />
      </div>
    </MessageProvider>
  );
}
