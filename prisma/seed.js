// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log(`Start seeding ...`);

    // 1. Crear Categorías
    const homeCategory = await prisma.serviceCategory.upsert({
        where: { slug: 'servicios-del-hogar' },
        update: {},
        create: { name: 'Servicios del Hogar', slug: 'servicios-del-hogar', icon: '🏠' },
    });

    const techCategory = await prisma.serviceCategory.upsert({
        where: { slug: 'servicios-tecnicos' },
        update: {},
        create: { name: 'Servicios Técnicos', slug: 'servicios-tecnicos', icon: '🛠️' },
    });
    
    const constructionCategory = await prisma.serviceCategory.upsert({
        where: { slug: 'construccion-y-remodelacion' },
        update: {},
        create: { name: 'Construcción y Remodelación', slug: 'construccion-y-remodelacion', icon: '🏗️' },
    });

    console.log('Categories created/verified.');

    // 2. Crear Servicios y asociarlos a una categoría
    const servicesData = [
      { name: 'Electricistas', slug: 'electricistas', description: 'Instalación y reparación', icon: '⚡', categoryId: techCategory.id },
      { name: 'Plomeros', slug: 'plomeros', description: 'Fugas, grifos y tuberías', icon: '🚰', categoryId: homeCategory.id },
      { name: 'Redes WiFi', slug: 'redes-wifi', description: 'Configuración y optimización', icon: '📶', categoryId: techCategory.id },
      { name: 'CCTV y Alarmas', slug: 'cctv-y-alarmas', description: 'Sistemas de seguridad', icon: '🔐', categoryId: techCategory.id },
      { name: 'Aire Acondicionado', slug: 'aire-acondicionado', description: 'Mantenimiento e instalación', icon: '❄️', categoryId: techCategory.id },
      { name: 'Pintores', slug: 'pintores', description: 'Interiores y exteriores', icon: '🎨', categoryId: homeCategory.id },
      { name: 'Limpieza', slug: 'limpieza', description: 'Hogar y oficina', icon: '🧹', categoryId: homeCategory.id },
      { name: 'Fumigación', slug: 'fumigacion', description: 'Control de plagas', icon: '🐜', categoryId: homeCategory.id },
      { name: 'Jardinería', slug: 'jardineria', description: 'Diseño y mantenimiento', icon: '🌿', categoryId: homeCategory.id },
      { name: 'Carpintería', slug: 'carpinteria', description: 'Muebles a medida', icon: '🪚', categoryId: constructionCategory.id },
      { name: 'Construcción', slug: 'construccion', description: 'Proyectos y remodelaciones', icon: '🏗️', categoryId: constructionCategory.id },
      { name: "Tablaroca", slug: "tablaroca", description: "Muros y plafones", icon: "🧱", categoryId: constructionCategory.id },
    ];

    for (const data of servicesData) {
        await prisma.service.upsert({
            where: { slug: data.slug },
            update: {},
            create: data,
        });
    }
    
    console.log('Services created/verified.');
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });