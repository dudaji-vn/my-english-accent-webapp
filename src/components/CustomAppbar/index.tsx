import { AppBar } from "@mui/material";
import { ReactNode } from "react";

type CustomAppBarProps = {
  open: boolean;
  children: ReactNode;
};

export default function CustomAppbar({ open, children }: CustomAppBarProps) {
  const drawerWidth = 240;
  return (
    <AppBar
      sx={[
        {
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) => {
            return theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            });
          },
        },
        open && {
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      ]}
    >
      {children}
    </AppBar>
  );
}
