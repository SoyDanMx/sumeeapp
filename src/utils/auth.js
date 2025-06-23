export async function verifyToken(token, requireAdmin = false) {
  if (!token) {
    return { 
      message: 'Authentication token required',
      status: 401
    };
  }

  try {
    // Implementar lógica real de verificación JWT
    // Ejemplo simplificado:
    const decoded = {}; // jwt.verify(token, process.env.JWT_SECRET);
    
    if (requireAdmin && !decoded.isAdmin) {
      return {
        message: 'Admin privileges required',
        status: 403
      };
    }

    return null; // No hay error
  } catch (error) {
    return {
      message: 'Invalid or expired token',
      status: 401
    };
  }
}