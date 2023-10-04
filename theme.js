import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "./tailwind.config";

const tailwindConfig = resolveConfig(tailwindConfigModule);
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: tailwindConfig.theme.colors.primary,
        },
        secondary: {
          main: tailwindConfig.theme.colors.secondary,
        },
        text: {
          primary: tailwindConfig.theme.colors.textPrimary,
          secondary: tailwindConfig.theme.colors.textSecondary,
        },
      },
    },
  },

  typography: {
    fontFamily: tailwindConfig.theme.fontFamily.inter,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        color: tailwindConfig.theme.colors.textPrimary,
      },
    },
  },
});

export default theme;
