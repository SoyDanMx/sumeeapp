// src/app/professionals/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaWhatsapp, FaLock, FaSpinner } from 'react-icons/fa';

export default function ProfessionalsPage() {
  const [hasMembership, setHasMembership] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const router = useRouter();

  // Verificar estado de membresía
  useEffect(() => {
    const checkMembership = async () => {
      setIsLoading(true);
      try {
        const token = Cookies.get('token');
        if (!token) {
          router.push('/login?redirect=/professionals');
          return;
        }

        const res = await fetch('/api/check-membership', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.ok) {
          const { hasMembership } = await res.json();
          setHasMembership(hasMembership);
          
          // Si ya tiene membresía, cargar profesionales
          if (hasMembership) {
            await loadProfessionals();
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkMembership();
  }, [paymentCompleted, router]);

  // Cargar profesionales
  const loadProfessionals = async () => {
    try {
      const res = await fetch('/api/professionals');
      if (res.ok) {
        const data = await res.json();
        setProfessionals(data.data || []);
      }
    } catch (error) {
      console.error('Error loading professionals:', error);
    }
  };

  // Manejar éxito de pago
  const handlePaymentSuccess = () => {
    setPaymentCompleted(true);
    // Forzar recarga de la página para actualizar estado
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <FaSpinner className="animate-spin h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-lg text-gray-600">Verificando tu membresía...</p>
        </div>
      </div>
    );
  }

  if (!hasMembership) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
              <FaLock className="h-8 w-8 text-red-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Acceso Premium Requerido</h1>
            <p className="text-xl text-gray-600 mb-8">
              Para acceder a nuestro directorio de profesionales certificados, necesitas una membresía premium.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">Beneficios de la Membresía</h2>
              <ul className="space-y-3 text-left">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Acceso completo a perfiles verificados</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Información de contacto directo</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ubicación exacta de profesionales cercanos</span>
                </li>
              </ul>
            </div>

            {/* Botón de pago de Stripe */}
            <div className="mt-8">
              <StripePaymentButton onSuccess={handlePaymentSuccess} />
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Pago seguro procesado por Stripe. Cancelación en cualquier momento.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Componente para mostrar los profesionales (tu código existente)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... tu código para mostrar profesionales ... */}
    </div>
  );
}

// Componente de Stripe
function StripePaymentButton({ onSuccess }) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    script.onload = () => {
      // Configurar evento personalizado para detectar pago exitoso
      document.addEventListener('paymentSuccess', onSuccess);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      document.removeEventListener('paymentSuccess', onSuccess);
    };
  }, [onSuccess]);

  return (
    <div className="stripe-button-container">
      <stripe-buy-button
        buy-button-id="buy_btn_1RaSlCE2shKTNR9MbQSGVUMW"
        publishable-key="pk_live_51P8c4AE2shKTNR9MVARQB4La2uYMMc2shlTCcpcg8EI6MqqPV1uN5uj6UbB5mpfReRKd4HL2OP1LoF17WXcYYeB000Ot1l847E"
      />
    </div>
  );
}