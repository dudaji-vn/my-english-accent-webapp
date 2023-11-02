import { AppBar, Box } from "@mui/material";
import { ReactNode } from "react";

type CustomAppBarProps = {
  children?: ReactNode;
};

export default function CustomDrawerHeader({ children }: CustomAppBarProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: (theme) => theme.spacing(0, 1),
        // necessary for content to be below app bar
        // ...theme.mixins.toolbar,
        height: (theme) => ({ ...theme.mixins.toolbar }),
      }}
    >
      {children}
    </Box>
  );
}
