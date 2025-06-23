// src/utils/auth.js

import jwt from 'jsonwebtoken';

// MEJORA: Añadimos la función 'generateToken' que faltaba.
// Esta función crea un token de sesión cuando un usuario inicia sesión.
export function generateToken(user) {
  // Creamos el "payload" con la información que queremos guardar en el token.
  // Es importante NO guardar información sensible como la contraseña aquí.
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role, // Guardamos el rol para futuras validaciones
  };

  // Firmamos el token usando nuestro secreto y le damos una duración de 1 día.
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });

  return token;
}


// Se mantiene tu función original, pero ahora con la lógica de verificación real.
export function verifyToken(token, requireAdmin = false) {
  if (!token) {
    return { 
      message: 'Authentication token required',
      status: 401
    };
  }

  try {
    // MEJORA: Implementamos la lógica real de verificación JWT.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Verificamos si se requieren privilegios de administrador.
    if (requireAdmin && decoded.role !== 'ADMIN') {
      return {
        message: 'Admin privileges required',
        status: 403
      };
    }

    // Si todo está bien, no devolvemos ningún error y adjuntamos el usuario decodificado.
    return { error: null, decodedUser: decoded };
  } catch (error) {
    return {
      message: 'Invalid or expired token',
      status: 401
    };
  }
}