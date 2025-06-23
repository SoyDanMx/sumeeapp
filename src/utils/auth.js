// src/utils/auth.js

import jwt from 'jsonwebtoken';

// Función para crear un token de sesión.
export function generateToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d', // El token expira en 1 día
  });

  return token;
}

// Función para verificar un token. Es una función 'async' por si en el futuro
// la verificación requiere una consulta a la base de datos.
export async function verifyToken(token) {
  if (!token) {
    return { error: { message: 'Authentication token required', status: 401 } };
  }

  try {
    // Verificamos el token con el secreto. Si es inválido o expiró, lanzará un error.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Si todo está bien, devolvemos el usuario decodificado.
    return { decodedUser: decoded };
  } catch (error) {
    return { error: { message: 'Invalid or expired token', status: 401 } };
  }
}