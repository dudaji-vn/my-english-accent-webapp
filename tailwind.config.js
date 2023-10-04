const plugin = require("tailwindcss/plugin");

module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#8646F4",
        secondary: "#13C296",
        gray: {
          100: "#f3f4f6",
        },
      },
    },
    fontFamily: {
      inter: ["Inter"],
    },
    colors: {
      textPrimary: "#1F2A37",
      textSecondary: "#6B7280",
    },
  },
};
