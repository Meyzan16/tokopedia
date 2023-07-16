import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import  { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Anime Collection',
  description: 'Showcase and discover remarable anime collection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <Navbar />
        <main>
         <Toaster />
          {children}
        </main>  
      <Footer />
        
      </body>
    </html>
  )
}
