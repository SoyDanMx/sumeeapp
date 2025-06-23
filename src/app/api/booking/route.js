// src/app/api/booking/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'; // SOLUCIÓN 1: Importamos el cliente de Prisma compartido
import { verifyToken } from '../../../utils/auth';

export async function POST(request) {
  try {
    const token = request.headers.get("authorization")?.split(" ")[1]; // Estándar: "Bearer TOKEN"

    // SOLUCIÓN 2: Usamos 'await' y manejamos el objeto de respuesta de verifyToken
    const tokenVerification = await verifyToken(token);
    if (tokenVerification.error) {
      return NextResponse.json({ error: tokenVerification.message }, { status: tokenVerification.status });
    }
    const { decodedUser } = tokenVerification;

    const { professionalId, date, timeSlot } = await request.json();
    if (!professionalId || !date || !timeSlot) {
      return NextResponse.json({ error: "Faltan datos para la reserva" }, { status: 400 });
    }

    // SOLUCIÓN 3 Y 4: Apuntamos al modelo correcto (ProfessionalProfile) y usamos el ID como String
    const professional = await prisma.professionalProfile.findUnique({
      where: { id: professionalId },
    });

    if (!professional) {
      return NextResponse.json({ error: "Profesional no disponible" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        clientId: decodedUser.userId, // El ID del cliente viene del token
        professionalId: professionalId, // El ID del profesional viene del request
        date: new Date(date),
        time: timeSlot,
        status: "PENDING",
      },
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error("Error al crear reserva:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}