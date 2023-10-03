import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfigModule from "./tailwind.config";

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
    fontFamily: tailwindConfig.theme.fontFamily.inter,
  },
});

export default theme;
