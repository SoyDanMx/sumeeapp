import Image from 'next/image';

export default function ServiceDetails({ service }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 w-full">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-4">{service.icon}</span>
          <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
        </div>
        
        <p className="text-lg text-gray-700 mb-6">{service.description}</p>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">¿Qué incluye este servicio?</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Instalación profesional</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Reparaciones urgentes</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✓</span>
              <span>Mantenimiento preventivo</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">¿Necesitas ayuda?</h3>
          <p>Nuestros profesionales verificados están listos para ayudarte.</p>
          <button className="mt-3 bg-primary text-white px-4 py-2 rounded-button hover:bg-primary-dark transition">
            Contactar a un profesional
          </button>
        </div>
      </div>
    </div>
  );
}