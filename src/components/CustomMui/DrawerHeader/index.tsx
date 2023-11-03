import { Box, useTheme } from "@mui/material";
import { ReactNode } from "react";

type CustomAppBarProps = {
  children?: ReactNode;
};

export default function CustomDrawerHeader({ children }: CustomAppBarProps) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      }}
    >
      {children}
    </Box>
  );
}
