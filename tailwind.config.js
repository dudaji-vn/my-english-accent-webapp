module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: "#root",
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
    },
    fontFamily: {
      inter: ["Inter"],
    },
  },
};
