// src/components/Footer.js
"use client"; // Necesario por los componentes hijos que usan hooks

import Link from "next/link";
import Image from "next/image";
import { FaShieldAlt, FaLock, FaBook, FaInfoCircle, FaFileAlt, FaStar, FaFacebookF, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";
import FooterLinkColumn from "./FooterLinkColumn";

const quickLinks = [
  { href: "/about", icon: FaInfoCircle, text: "Sobre Nosotros" },
  { href: "/services", icon: FaShieldAlt, text: "Nuestros Servicios" },
  { href: "/professionals", icon: FaStar, text: "Profesionales" },
  { href: "/membership", icon: FaStar, text: "Membresía Premium" },
  { href: "/join-as-pro", icon: FaShieldAlt, text: "Únete como Profesional" },
];

const legalLinks = [
  { href: "/terms", icon: FaFileAlt, text: "Términos de Servicio" },
  { href: "/privacy", icon: FaLock, text: "Política de Privacidad" },
  { href: "/code-of-conduct", icon: FaBook, text: "Código de Conducta" },
  { href: "/guarantee", icon: FaShieldAlt, text: "Garantía de Servicio" },
  { href: "/contact", icon: FaInfoCircle, text: "Contáctanos" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Columna de Información */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image src="/logo.png" alt="SUMEE Logo" width={160} height={40} className="h-auto w-40 hover:opacity-90 transition-opacity" />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">Conectamos usuarios con técnicos certificados para soluciones confiables.</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3"><FaMapMarkerAlt className="text-primary mt-1" /><span className="text-gray-300 text-sm">Ciudad de México, México</span></div>
              <div className="flex items-center gap-3"><FaPhoneAlt className="text-primary" /><a href="tel:+525636741156" className="text-gray-300 text-sm hover:text-primary transition-colors">+52 56 3674 1156</a></div>
              <div className="flex items-center gap-3"><FaEnvelope className="text-primary" /><a href="mailto:contacto@sumeeapp.com" className="text-gray-300 text-sm hover:text-primary transition-colors">contacto@sumeeapp.com</a></div>
            </div>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61576223335013" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-primary text-white p-3 rounded-full transition-colors flex items-center justify-center" aria-label="Facebook de Sumee"><FaFacebookF className="w-4 h-4" /></a>
              <a href="https://www.linkedin.com/company/sumee-app" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-[#0077B5] text-white p-3 rounded-full transition-colors flex items-center justify-center" aria-label="LinkedIn de Sumee"><FaLinkedinIn className="w-4 h-4" /></a>
            </div>
          </div>

          {/* MEJORA: Columnas de enlaces reutilizables */}
          <FooterLinkColumn title="Enlaces Rápidos" links={quickLinks} />
          <FooterLinkColumn title="Legal" links={legalLinks} />

          {/* MEJORA: Componente de Newsletter dedicado */}
          <NewsletterForm />

        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Sumee App. Todos los derechos reservados.</p>
          <p className="text-gray-500 text-xs mt-2">Powered by NUO INTEGRACIONES</p>
        </div>
      </div>
    </footer>
  );
}