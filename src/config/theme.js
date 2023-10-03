import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "@/tailwind.config.js";

const tailwindConfig = resolveConfig(tailwindConfigModule);

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: tailwindConfig.theme.colors.primary.main,
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, Arial",
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "white",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Inter, sans-serif';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Inter'), local('Inter-Regular'), url(${"public/fonts/Inter-Regular.ttf"}) format('ttf');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

export default theme;
