"use client";

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showNotification('Por favor ingresa tu nombre / Please enter your name', 'error');
      return false;
    }

    if (!formData.email.trim()) {
      showNotification('Por favor ingresa tu correo electrónico / Please enter your email', 'error');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showNotification('Por favor ingresa un correo electrónico válido / Please enter a valid email', 'error');
      return false;
    }

    if (!formData.message.trim()) {
      showNotification('Por favor ingresa tu mensaje / Please enter your message', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const { status } = await emailjs.send(
        'service_zvh9gmc', // Service ID
        'template_bto0m05', // Template ID
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          title: 'Nuevo mensaje de contacto',
        },
        'uTEWIWOgwP7ziXaIA' // Public Key
      );

      if (status === 200) {
        showNotification('Mensaje enviado con éxito / Message sent successfully');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      showNotification(
        error.text || 'Error al enviar el mensaje / Error sending message', 
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-6 bg-gray-50" id="contact">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <Link href="#contact-form" scroll={false}>
            <button className="bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors">
              Unirse a la lista de espera / Join Waitlist
            </button>
          </Link>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm">
          <form 
            id="contact-form" 
            onSubmit={handleSubmit} 
            className="space-y-6"
            aria-label="Formulario de contacto"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre / Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu nombre / Your name"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico / Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="tu@correo.com"
                required
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono / Phone (Opcional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Tu número de teléfono / Your phone number"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje / Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                rows="5"
                placeholder="Escribe tu mensaje aquí / Write your message here"
                required
                aria-required="true"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white px-8 py-3 rounded-button hover:bg-opacity-90 transition-colors disabled:opacity-70"
              disabled={isSubmitting}
              aria-label="Enviar mensaje"
            >
              {isSubmitting ? 'Enviando... / Sending...' : 'Enviar / Send'}
            </button>
          </form>
        </div>

        {notification && (
          <div 
            className={`fixed top-4 right-4 max-w-sm w-full p-4 rounded-lg shadow-lg z-50 flex justify-between items-center ${
              notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}
            role="alert"
            aria-live="assertive"
          >
            <p>{notification.message}</p>
            <button 
              onClick={() => setNotification(null)} 
              className="text-gray-500 hover:text-gray-700 ml-4"
              aria-label="Cerrar notificación"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </section>
  );
}