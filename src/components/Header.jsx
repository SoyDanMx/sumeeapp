// src/components/Header.jsx
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

// Iconos que usamos
const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
  </svg>
);
const BarsIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const TimesIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export default function Header({ services = [] }) {
  // ELIMINADO: Se quita el console.log de depuración.

  // --- ESTADO DEL COMPONENTE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // --- EFECTOS ---
  useEffect(() => {
    const token = Cookies.get('token');
    setIsAuthenticated(!!token);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- MANEJADORES DE EVENTOS ---
  const handleLogout = () => {
    Cookies.remove('token');
    setIsAuthenticated(false);
    setIsMobileMenuOpen(false);
    router.push('/');
  };

  const closeAllMenus = () => {
    setIsServicesOpen(false);
    setIsMobileMenuOpen(false);
  };
  
  return (
      // MEJORA: Se quita la barra amarilla y el margen superior que era para la barra. El header vuelve a su posición original.
      <header className="fixed w-full bg-white shadow-sm z-40">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link href="/" onClick={closeAllMenus}>
            <Image src="/logo.png" alt="SUMEE Logo" width={160} height={48} priority />
          </Link>
          
          {/* --- MENÚ DE ESCRITORIO --- */}
          <div className="hidden md:flex items-center gap-6">
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="flex items-center gap-1 font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-md">
                <span>Servicios</span>
                <ChevronDownIcon className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`} />
              </button>
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-72 origin-top-left rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5 p-2 animate-fadeIn z-50">
                  {services.length > 0 ? (
                    <div className="flex flex-col gap-1">
                      {services.map((service) => (
                        <Link key={service.slug} href={`/services/${service.slug}`} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 hover:text-primary rounded-md transition-colors" onClick={closeAllMenus}>
                          <span className="text-lg">{service.icon}</span>
                          <span>{service.name}</span>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">No hay servicios para mostrar.</div>
                  )}
                </div>
              )}
            </div>
            <Link href="/professionals" className="font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2">Profesionales</Link>
            <Link href="/join-as-pro" className="font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2">Únete como Pro</Link>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <Link href="/profile" className="font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2">Mi Perfil</Link>
            ) : (
              <>
                <Link href="/login" className="font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2 rounded-md">Iniciar Sesión</Link>
                <Link href="/signup" className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow-md">Registrarse</Link>
              </>
            )}
          </div>
          
          {/* --- BOTÓN DE MENÚ MÓVIL --- */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-700">
              {isMobileMenuOpen ? <TimesIcon className="w-6 h-6"/> : <BarsIcon className="w-6 h-6"/>}
            </button>
          </div>
        </nav>

        {/* --- PANEL DEL MENÚ MÓVIL --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 p-4 absolute top-full left-0 w-full shadow-lg">
            <nav className="flex flex-col gap-4">
              <Link href="/services" className="font-medium text-gray-700" onClick={closeAllMenus}>Ver todos los Servicios</Link>
              <Link href="/professionals" className="font-medium text-gray-700" onClick={closeAllMenus}>Profesionales</Link>
              <Link href="/join-as-pro" className="font-medium text-gray-700" onClick={closeAllMenus}>Únete como Pro</Link>
              <div className="border-t border-gray-200 my-2"></div>
              {isAuthenticated ? (
                <Link href="/profile" className="font-medium text-gray-700" onClick={closeAllMenus}>Mi Perfil</Link>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" className="text-center font-medium bg-gray-100 text-gray-800 py-2 rounded-md" onClick={closeAllMenus}>Iniciar Sesión</Link>
                  <Link href="/signup" className="text-center font-medium bg-primary text-white py-2 rounded-md" onClick={closeAllMenus}>Registrarse</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </header>
  );
}