// postcss.config.mjs

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Para v3, se usa 'tailwindcss' directamente como plugin.
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;