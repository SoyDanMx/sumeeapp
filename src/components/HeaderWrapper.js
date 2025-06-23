// src/components/HeaderWrapper.js

import prisma from '../lib/prisma'; // Usando ruta relativa para máxima compatibilidad
import Header from './Header.jsx';

// Este es un Componente de Servidor. Es asíncrono para poder hablar con la base de datos.
export default async function HeaderWrapper() {
  try {
    // 1. Obtenemos la lista de servicios directamente desde tu base de datos PostgreSQL.
    const services = await prisma.service.findMany({
      select: {
        name: true,
        slug: true,
        icon: true,
      },
      orderBy: {
        name: 'asc' // Los ordenamos alfabéticamente
      }
    });

    // 2. Renderizamos el componente visual del Header y le pasamos los servicios como un "prop".
    return <Header services={services} />;
  } catch (error) {
    // En caso de un error de base de datos, lo mostramos en la consola del servidor
    // y renderizamos el Header con una lista vacía para que la app no se rompa.
    console.error("Error al obtener servicios para el Header:", error);
    return <Header services={[]} />;
  }
}