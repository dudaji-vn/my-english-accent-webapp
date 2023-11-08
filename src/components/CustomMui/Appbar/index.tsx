import { AppBar, CSSObject, Theme, useTheme } from "@mui/material";
import { ReactNode } from "react";

type CustomAppBarProps = {
  open: boolean;
  children: ReactNode;
};

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
  marginLeft: drawerWidth,
  width: `calc(100% - ${drawerWidth}px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

export default function CustomAppbar({ open, children }: CustomAppBarProps) {
  const drawerWidth = 260;
  const theme = useTheme();
  return (
    <AppBar
      sx={[
        {
          bgcolor: "transparent",
          boxShadow: "none",
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
        open && { ...openedMixin(theme, drawerWidth) },
      ]}
      className='divider'
    >
      {children}
    </AppBar>
  );
}
