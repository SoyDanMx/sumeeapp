// src/app/page.js

// Restaurando las importaciones originales de tu página de inicio
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import ClientContactSection from '../components/ClientContactSection';
import Link from 'next/link';
import DynamicMapSection from '../components/DynamicMapSection';

export default function Home() {
  return (
    // Se usa un Fragment (<>) para asegurar que no hay etiquetas <main> anidadas
    <>
      {/* El Header y el Footer son renderizados por layout.js, por lo que no se incluyen aquí */}
      
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <DynamicMapSection />
      <ClientContactSection />
      
      {/* Esta sección es específica de la página de inicio y se mantiene */}
      <section className="py-12 px-6 bg-gray-100 text-center">
        <Link href="/join-as-pro">
          <button
            className="bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors"
            aria-label="Únete como Pro en Sumee App"
          >
            Únete como Pro / Join as Pro
          </button>
        </Link>
      </section>
    </>
  );
}