import { notFound } from 'next/navigation';
import Image from 'next/image';

// Datos específicos para cada tipo de servicio
const serviceTemplates = {
  electricistas: {
    services: [
      {
        icon: '🔌',
        title: 'Instalaciones Eléctricas',
        description: 'Instalación completa y segura de sistemas eléctricos en viviendas y locales comerciales.'
      },
      {
        icon: '🛠️',
        title: 'Reparaciones Urgentes',
        description: 'Solución rápida a fallos eléctricos, cortocircuitos y problemas de potencia.'
      },
      {
        icon: '💡',
        title: 'Iluminación',
        description: 'Diseño e instalación de sistemas de iluminación interior y exterior.'
      }
    ],
    workSteps: [
      {
        title: 'Diagnóstico',
        description: 'Evaluamos tus necesidades eléctricas y realizamos un diagnóstico completo.'
      },
      {
        title: 'Presupuesto',
        description: 'Te enviamos un presupuesto detallado sin compromiso.'
      },
      {
        title: 'Ejecución',
        description: 'Nuestros profesionales certificados realizan el trabajo con los más altos estándares.'
      }
    ],
    professionalsTitle: 'Electricistas Certificados'
  },
  plomeros: {
    services: [
      {
        icon: '🚰',
        title: 'Reparación de Fugas',
        description: 'Solución profesional para fugas de agua en tuberías y conexiones.'
      },
      {
        icon: '🚽',
        title: 'Instalación Sanitaria',
        description: 'Instalación y mantenimiento de baños y cocinas.'
      },
      {
        icon: '🛁',
        title: 'Drenajes',
        description: 'Limpieza y reparación de sistemas de drenaje.'
      }
    ],
    workSteps: [
      {
        title: 'Evaluación',
        description: 'Identificamos el problema y sus posibles soluciones.'
      },
      {
        title: 'Cotización',
        description: 'Te proporcionamos un presupuesto claro y transparente.'
      },
      {
        title: 'Reparación',
        description: 'Realizamos el trabajo con materiales de calidad y garantía.'
      }
    ],
    professionalsTitle: 'Plomeros Certificados'
  },
  // Puedes agregar más plantillas para otros servicios
};

// Datos de profesionales de ejemplo
const featuredProfessionals = [
  {
    name: 'Juan Pérez',
    image: '/images/professionals/professional1.jpg',
    rating: 5,
    reviews: 42,
    description: 'Profesional con 10 años de experiencia en el rubro.'
  },
  {
    name: 'María González',
    image: '/images/professionals/professional2.jpg',
    rating: 4,
    reviews: 28,
    description: 'Especialista en soluciones modernas y eficientes.'
  },
  {
    name: 'Carlos Rodríguez',
    image: '/images/professionals/professional3.jpg',
    rating: 5,
    reviews: 35,
    description: 'Técnico certificado con amplia experiencia.'
  }
];

export default function ServicePage({ params }) {
  const { service: serviceSlug } = params;
  const serviceInfo = getServiceBySlug(serviceSlug);
  
  if (!serviceInfo) return notFound();

  // Obtener plantilla específica o usar una por defecto
  const template = serviceTemplates[serviceSlug] || {
    services: serviceInfo.featuredServices,
    workSteps: [
      {
        title: 'Contacto',
        description: 'Nos comunicamos contigo para entender tus necesidades.'
      },
      {
        title: 'Solución',
        description: 'Te proponemos la mejor solución para tu problema.'
      },
      {
        title: 'Ejecución',
        description: 'Realizamos el trabajo con los más altos estándares.'
      }
    ],
    professionalsTitle: `Profesionales de ${serviceInfo.title}`
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Servicio de {serviceInfo.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {serviceInfo.description}
              </p>
              <button className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
                Contactar a un profesional
              </button>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={serviceInfo.image || '/images/services/default-service.jpg'}
                  alt={`${serviceInfo.title} trabajando`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servicios Detallados */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Nuestros Servicios de {serviceInfo.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {template.services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cómo Funciona */}
      <div className="bg-primary-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">¿Cómo trabajamos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {template.workSteps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profesionales Destacados */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{template.professionalsTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProfessionals.map((professional, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <Image
                  src={professional.image}
                  alt={professional.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold">{professional.name}</h3>
                <div className="flex items-center mt-2 mb-4">
                  <div className="flex text-yellow-400">
                    {'★'.repeat(professional.rating)}
                  </div>
                  <span className="ml-2 text-gray-600">({professional.reviews} reseñas)</span>
                </div>
                <p className="text-gray-600 mb-4">{professional.description}</p>
                <button className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors">
                  Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Necesitas un {serviceInfo.title.toLowerCase()} ahora?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contacta con nuestros profesionales certificados y soluciona tus problemas con garantía.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
            Solicitar Servicio
          </button>
        </div>
      </div>
    </div>
  );
}