// src/lib/prisma.js

import { PrismaClient } from '@prisma/client';

// Declaramos una variable global para guardar el cliente de Prisma.
let prisma;

if (process.env.NODE_ENV === 'production') {
  // En producción, creamos una única instancia.
  prisma = new PrismaClient();
} else {
  // En desarrollo, evitamos crear múltiples instancias debido al "hot-reloading" de Next.js.
  // Reutilizamos la instancia si ya existe en el objeto global.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;