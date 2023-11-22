const plugin = require("tailwindcss/plugin");

module.exports = {
  corePlugins: {
    preflight: false,
  },
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],

  important: "#root",
  theme: {
    extend: {
      colors: {
        primary: "#7F56D9",
        secondary: "#13C296",
        gray: {
          50: "#F9FAFB",
          100: "#f3f4f6",
          200: "#49454F14"
        },
        purple: {
          50: "#F9F5FF",
          200: "#DDD6FE",
          300: "#C4B5FD",
        },
        white: "#FFF",
        stroke: "#DFE4EA",
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
