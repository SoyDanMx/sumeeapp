'use client';
import Link from 'next/link';
import {
  FaBolt,
  FaWrench,
  FaWifi,
  FaCamera,
  FaSnowflake,
  FaPaintRoller,
  FaSoap,
  FaBug,
  FaTree,
  FaHammer,
  FaBuilding,
  FaCube,
} from 'react-icons/fa';

const servicesData = [
  {
    id: 1,
    icon: <FaBolt className="w-8 h-8" />,
    title: "Electricistas",
    titleEn: "Electricians",
    description: "Instalación y reparación eléctrica",
    descriptionEn: "Electrical installation and repair",
    slug: "electricistas"
  },
  {
    id: 2,
    icon: <FaWrench className="w-8 h-8" />,
    title: "Plomeros",
    titleEn: "Plumbers",
    description: "Servicios de plomería profesional",
    descriptionEn: "Professional plumbing services",
    slug: "plomeros"
  },
  {
    id: 3,
    icon: <FaWifi className="w-8 h-8" />,
    title: "Redes WiFi",
    titleEn: "WiFi Setup",
    description: "Instalación y configuración de redes",
    descriptionEn: "Network installation and setup",
    slug: "redes-wifi"
  },
  {
    id: 4,
    icon: <FaCamera className="w-8 h-8" />,
    title: "CCTV y Alarmas",
    titleEn: "Security Systems",
    description: "Sistemas de seguridad integral",
    descriptionEn: "Comprehensive security systems",
    slug: "cctv-alarmas"
  },
  {
    id: 5,
    icon: <FaSnowflake className="w-8 h-8" />,
    title: "Aire Acondicionado",
    titleEn: "AC Technicians",
    description: "Instalación y mantenimiento",
    descriptionEn: "Installation and maintenance",
    slug: "aire-acondicionado"
  },
  {
    id: 6,
    icon: <FaPaintRoller className="w-8 h-8" />,
    title: "Pintores",
    titleEn: "Painters",
    description: "Servicios profesionales de pintura",
    descriptionEn: "Professional painting services",
    slug: "pintores"
  },
  {
    id: 7,
    icon: <FaSoap className="w-8 h-8" />,
    title: "Limpieza",
    titleEn: "Cleaning",
    description: "Servicios profesionales de limpieza",
    descriptionEn: "Professional cleaning services",
    slug: "limpieza"
  },
  {
    id: 8,
    icon: <FaBug className="w-8 h-8" />,
    title: "Fumigación",
    titleEn: "Pest Control",
    description: "Control de plagas profesional",
    descriptionEn: "Professional pest control",
    slug: "fumigacion"
  },
  {
    id: 9,
    icon: <FaTree className="w-8 h-8" />,
    title: "Jardinería",
    titleEn: "Gardening",
    description: "Mantenimiento de jardines",
    descriptionEn: "Garden maintenance",
    slug: "jardineria"
  },
  {
    id: 10,
    icon: <FaHammer className="w-8 h-8" />,
    title: "Carpintería",
    titleEn: "Carpentry",
    description: "Trabajos en madera",
    descriptionEn: "Woodworking services",
    slug: "carpinteria"
  },
  {
    id: 11,
    icon: <FaBuilding className="w-8 h-8" />,
    title: "Arquitectura y Construcción",
    titleEn: "Architecture & Construction",
    description: "Diseño y construcción",
    descriptionEn: "Design and construction",
    slug: "arquitectura-construccion"
  },
  {
    id: 12,
    icon: <FaCube className="w-8 h-8" />,
    title: "Tablaroca",
    titleEn: "Drywall",
    description: "Instalación y reparación",
    descriptionEn: "Installation and repair",
    slug: "tablaroca"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Nuestros Servicios</h2>
          <p className="mt-2 text-lg text-gray-600">Our Services</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <Link 
              key={service.id} 
              href={`/servicios/${service.slug}`}
              className="group block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4 text-blue-600">
                  <div className="p-3 bg-blue-50 rounded-full group-hover:bg-blue-100 transition-colors">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                  {service.title} <span className="text-gray-500">/ {service.titleEn}</span>
                </h3>
                <p className="text-gray-600 text-center text-sm">
                  {service.description}
                </p>
                <p className="text-gray-500 text-center text-sm mt-1">
                  {service.descriptionEn}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}