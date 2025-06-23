// src/components/NewsletterForm.js
"use client";

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Por favor, ingresa un email.');
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Enviando...');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      toast.dismiss(loadingToast);

      if (!response.ok) {
        throw new Error(data.message || 'Error en la suscripción.');
      }

      toast.success('¡Gracias por suscribirte!');
      setEmail('');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.message || 'No se pudo completar la suscripción.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="font-bold mb-6 text-lg text-gray-100 uppercase tracking-wider">
        Newsletter
      </h4>
      <p className="text-gray-300 mb-6 text-sm leading-relaxed">
        Recibe nuestras últimas actualizaciones y ofertas especiales.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            className="w-full px-5 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            disabled={isSubmitting}
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Suscribirme"}
        </button>
      </form>
    </div>
  );
}