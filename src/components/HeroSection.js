"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "info") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!service || !location) {
      showNotification(
        "Por favor complete todos los campos / Please fill all fields",
        "error"
      );
      return;
    }
    try {
      // Simulación de búsqueda
      showNotification("Búsqueda exitosa / Search successful");
    } catch (error) {
      showNotification("Error en la búsqueda / Search error", "error");
    }
  };

  return (
    <section className={`${styles.hero} bg-blue-600 text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sección de texto y búsqueda */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Encuentra técnicos verificados en minutos
            </h1>
            <p className="text-xl text-blue-100 max-w-lg">
              Conectamos expertos certificados con usuarios que necesitan servicios
              técnicos de calidad
            </p>
            
            <form onSubmit={handleSearch} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="search"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className={`${styles.searchInput} w-full pl-10 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800`}
                    placeholder="¿Qué servicio necesitas?"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-map-pin-line text-gray-400"></i>
                  </div>
                  <input
                    type="search"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`${styles.searchInput} w-full pl-10 p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-800`}
                    placeholder="Tu ubicación"
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`${styles.searchButton} w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg transition-all duration-200`}
              >
                Buscar
              </button>
            </form>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center">
                <div className="bg-white p-1 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg">Garantía de Satisfacción</span>
              </div>
              <div className="flex items-center">
                <div className="bg-white p-1 rounded-full mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg">Verificación de Identidad</span>
              </div>
            </div>
          </div>

          {/* Sección de imagen del técnico */}
          <div className={`${styles.bannerImageContainer} h-full`}>
            <Image
              src="/images/technician-banner.jpg"
              alt="Técnico profesional"
              width={600}
              height={400}
              className={styles.bannerImage}
              priority
            />
            <div className={styles.imageOverlay}>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold text-white">Juan Plomero</h3>
                  <div className="flex items-center mt-2">
                    <div className={styles.starRating}>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-white text-lg">5.0 (2,500+ reseñas)</span>
                  </div>
                </div>
                <div className={`${styles.ratingBadge} bg-yellow-400 text-black px-4 py-2 rounded-full text-lg font-bold`}>
                  <span>★ 5/5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificación */}
      {notification && (
        <div className={styles.notification}>
          <div
            className={`${styles.notificationContent} ${
              notification.type === "error" ? styles.error : styles.success
            }`}
          >
            <p>{notification.message}</p>
            <button
              onClick={() => setNotification(null)}
              className={styles.closeButton}
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}