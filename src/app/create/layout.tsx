import type { Metadata } from 'next';
import '../globals.css';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from './components/appSideBar';

export const metadata: Metadata = {
  title: 'simplecx by Retink (Beta)',
  description: 'Multiformat content creation now super simple with simplecx',
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
  <div className="bg-black border-none">
    {/* <SidebarProvider> */}
      {/* <AppSidebar /> */}
      {/* <SidebarTrigger /> */}
      <main>{children}</main>
    {/* </SidebarProvider> */}
  </div>
  );
}
