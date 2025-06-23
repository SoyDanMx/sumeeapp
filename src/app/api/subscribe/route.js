// src/app/api/subscribe/route.js

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ message: 'El email es requerido.' }, { status: 400 });
    }

    // Aquí iría tu lógica para guardar el email en la base de datos o en un servicio de mailing
    // como Mailchimp, ConvertKit, etc.
    // Por ahora, simularemos un éxito.
    console.log(`Email recibido para suscripción: ${email}`);
    
    // Simulación de una operación asíncrona
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ message: '¡Suscripción exitosa!' }, { status: 200 });

  } catch (error) {
    console.error('Error en la suscripción:', error);
    return NextResponse.json({ message: 'Ocurrió un error en el servidor.' }, { status: 500 });
  }
}