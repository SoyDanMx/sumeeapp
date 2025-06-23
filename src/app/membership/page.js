// src/app/membership/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Membership() {
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Cargar el script de Stripe dinámicamente cuando se muestre el pago
    if (showPayment) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [showPayment]);

  const handleMembershipClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/check-auth", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        setError("Por favor inicia sesión para continuar.");
        setTimeout(() => router.push("/login"), 1500);
        return;
      }
      setShowPayment(true);
    } catch (err) {
      setError("Error al verificar autenticación.");
      console.error("Auth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col items-center justify-start py-12 px-4">
      {/* Hero Section */}
      <div className="w-full max-w-2xl text-center mb-10">
        <div className="mx-auto mb-4 w-16 h-16 relative">
          <Image
            src="/logo.png"
            alt="Sumee Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2" style={{letterSpacing: '-1px'}}>Membresía Sumee</h1>
        <p className="text-lg text-gray-700 mb-2">Accede a beneficios exclusivos y lleva tu experiencia al siguiente nivel.</p>
        <p className="text-base text-gray-500">Disfruta de atención prioritaria, descuentos y mucho más por solo</p>
        <span className="inline-block mt-2 text-3xl font-bold text-green-600">$299 MXN/mes</span>
      </div>

      {/* Card de Beneficios */}
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 mb-8 border border-blue-100">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">¿Qué incluye tu membresía?</h2>
        <ul className="space-y-4 text-left">
          <li className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Acceso completo al directorio de profesionales
          </li>
          <li className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 10c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h12a2 2 0 012 2v7c0 2.21-3.582 4-8 4z" /></svg>
            Información de contacto directo de técnicos
          </li>
          <li className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20c4.418 0 8-1.79 8-4V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9c0 2.21 3.582 4 8 4z" /></svg>
            Ubicación exacta de profesionales cercanos
          </li>
          <li className="flex items-center gap-3">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2z" /></svg>
            Reseñas y calificaciones verificadas
          </li>
        </ul>
        
        {error && (
          <div className="mt-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        <button
          onClick={handleMembershipClick}
          disabled={isLoading}
          className="mt-8 w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Procesando...
            </>
          ) : (
            '¡Quiero ser miembro!'
          )}
        </button>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>Pago seguro procesado por Stripe</p>
          <p className="mt-1">Al suscribirte, aceptas nuestros <a href="/terms" className="text-blue-600 hover:underline">Términos</a> y <a href="/privacy" className="text-blue-600 hover:underline">Privacidad</a>.</p>
        </div>
      </div>

      {/* Modal de pago */}
      {showPayment && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-green-100">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-green-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2-.896 2-2 2-2-.896-2-2zm0 0V7m0 4v4m0 0c-4.418 0-8-1.79-8-4V7a2 2 0 012-2h12a2 2 0 012 2v4c0 2.21-3.582 4-8 4z" />
              </svg>
              
              <h2 className="text-xl font-bold text-gray-900 mb-2">Completa tu membresía</h2>
              <p className="text-gray-600 mb-6 text-center">Proceso de pago seguro con Stripe</p>
              
              {/* Botón de Stripe integrado */}
              <div className="w-full">
                <stripe-buy-button
                  buy-button-id="buy_btn_1RaSlCE2shKTNR9MbQSGVUMW"
                  publishable-key="pk_live_51P8c4AE2shKTNR9MVARQB4La2uYMMc2shlTCcpcg8EI6MqqPV1uN5uj6UbB5mpfReRKd4HL2OP1LoF17WXcYYeB000Ot1l847E"
                />
              </div>
              
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <svg className="h-4 w-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Pagos 100% seguros
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}