// src/app/api/check-membership/route.js
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

export async function GET(request) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { error: 'Token de autenticación requerido' },
        { status: 401 }
      );
    }

    // Verificar token y obtener userId (simplificado)
    // En producción, usa JWT o tu método de autenticación
    const userId = token; // Esto es solo para ejemplo - implementa autenticación real

    const membership = await prisma.membership.findFirst({
      where: {
        userId,
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      },
      select: {
        id: true,
        plan: true,
        expiresAt: true
      }
    });

    return NextResponse.json({
      hasMembership: !!membership,
      membershipDetails: membership || null
    }, { status: 200 });

  } catch (error) {
    console.error('Error checking membership:', error);
    return NextResponse.json(
      { error: 'Error al verificar membresía' },
      { status: 500 }
    );
  }
}