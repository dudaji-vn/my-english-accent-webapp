module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: "#root",
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#EAEDF6",
          main: "#3041C7",
          dark: "#000320",
          accent: "#0f30ab",
          "contrast-text": "#ffffff",
        },
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
};
