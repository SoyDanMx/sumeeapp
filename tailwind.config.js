/** @type {import('tailwindcss').Config} */



// MEJORA: Importamos los temas por defecto de Tailwind para poder extenderlos de forma segura.

const { fontFamily } = require('tailwindcss/defaultTheme');



module.exports = {

// La configuración de 'content' está perfecta, escanea todos los archivos necesarios.

content: [

"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",

"./src/components/**/*.{js,ts,jsx,tsx,mdx}",

"./src/app/**/*.{js,ts,jsx,tsx,mdx}",

],


theme: {

// --- MEJORA: Configuración del container nativo de Tailwind ---

// Esto reemplaza la clase .container que tenías en globals.css.

// Ahora, cuando uses la clase "container" en tu HTML/JSX, aplicará estos estilos.

container: {

center: true, // Centra el contenedor horizontalmente.

padding: {

DEFAULT: '1rem', // 16px de padding en los lados para móviles.

sm: '1.5rem', // 24px en pantallas pequeñas.

lg: '2rem' // 32px en pantallas grandes.

},

screens: {

sm: '640px',

md: '768px',

lg: '1024px',

xl: '1200px', // El ancho máximo de tu contenido será 1200px.

},

},



// --- extend ---

// Usamos 'extend' para AÑADIR a los estilos por defecto de Tailwind, no para reemplazarlos.

extend: {

// Tus colores personalizados están muy bien definidos. Los mantenemos.

colors: {

primary: "#7209CF",

secondary: "#888888",

purple: {

50: "#faf5ff",

600: "#7c3aed",

},

whatsapp: {

DEFAULT: "#25D366",

hover: "#20C35A",

},

},


// --- MEJORA: Integración con next/font ---

fontFamily: {

// Le decimos a Tailwind que la clase 'font-sans' (la fuente por defecto)

// debe usar la variable CSS '--font-inter' que definimos en layout.js.

// Esto conecta la optimización de fuentes de Next.js con Tailwind.

sans: ['var(--font-inter)', ...fontFamily.sans],


// Tu fuente personalizada 'Pacifico' se mantiene igual.

pacifico: ["Pacifico", "cursive"],

},



// Tu borderRadius personalizado se mantiene. Es una buena práctica.

borderRadius: {

button: "9999px",

},


// MEJORA: Añadimos la animación que usamos en el header para tenerla configurada aquí.

keyframes: {

fadeIn: {

'from': { opacity: 0, transform: 'translateY(-10px)' },

'to': { opacity: 1, transform: 'translateY(0)' },

},

},

animation: {

fadeIn: 'fadeIn 0.2s ease-out forwards',

},

},

},



plugins: [],

};