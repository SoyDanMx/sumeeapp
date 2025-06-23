export function validateProfessionalData(data) {
    const errors = {};
    const requiredFields = ['name', 'email', 'profession', 'area'];
    
    // Validar campos requeridos
    requiredFields.forEach(field => {
      if (!data[field]?.trim()) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
  
    // Validar formato de email
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Invalid email format';
    }
  
    // Validar teléfono si se proporciona
    if (data.phone && !/^[\d\s+\-()]{8,20}$/.test(data.phone)) {
      errors.phone = 'Invalid phone number format';
    }
  
    // Validar ubicación si se proporciona
    if (data.location && (!data.location.lat || !data.location.lng)) {
      errors.location = 'Complete location data required (lat and lng)';
    }
  
    return Object.keys(errors).length > 0 ? errors : null;
  }