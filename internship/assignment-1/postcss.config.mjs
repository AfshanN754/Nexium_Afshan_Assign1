const config = {
  plugins: [
    require("@tailwindcss/postcss")({
      config: "./tailwind.config.js",
    }),
  ],
};

export default config;