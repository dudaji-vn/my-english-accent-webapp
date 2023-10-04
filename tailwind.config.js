const plugin = require("tailwindcss/plugin");

module.exports = {
  corePlugins: {
    preflight: true,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#8646F4",
        secondary: "#13C296",
      },
    },
    fontFamily: {
      inter: ["Inter"],
    },
    colors: {
      textPrimary: "#637381",
      textSecondary: "#8899A8",
    },
  },
};
