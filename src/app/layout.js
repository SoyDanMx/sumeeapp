// src/app/layout.js

// Usamos rutas relativas para garantizar la máxima compatibilidad
import HeaderWrapper from '../components/HeaderWrapper';
import Footer from '../components/Footer';
import Analytics from '../components/Analytics';
import ClientWhatsAppButton from '../components/ClientWhatsAppButton';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

// SOLUCIÓN: Nos aseguramos de que la ruta a globals.css sea relativa y correcta.
// layout.js está en 'src/app/', por lo que necesitamos subir un nivel ('../') para llegar a 'src/'
// y luego entrar a 'styles/'.
import '../styles/globals.css'; 

// Este import de leaflet.css es correcto si lo tienes en la raíz de 'src' o configurado de otra manera.
// Si no, también deberíamos usar una ruta relativa. Por ahora, lo dejamos como está.
import "leaflet/dist/leaflet.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: "Sumee App - Servicios Técnicos de Confianza",
  description: "Conecta con profesionales verificados para tus proyectos y reparaciones en México.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable}`} style={{ scrollBehavior: "smooth" }}>
      <body className="flex flex-col min-h-screen font-sans bg-gray-50">
        <Toaster position="top-right" />
        
        <HeaderWrapper />

        <main className="flex-grow pt-20"> 
          {children}
        </main>

        <Footer />
        
        <ClientWhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}