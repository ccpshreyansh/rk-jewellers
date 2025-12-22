import { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
// import Footer from './Footer'


export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* HARD SPACER for fixed header */}
      <div className="h-[88px]" />

      <main className="flex-1">
        {children}
      </main>
      <WhatsAppButton/>
      <Footer />
    </div>
  );
}
