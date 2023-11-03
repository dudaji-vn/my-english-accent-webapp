import { AppBar, Box, CSSObject, Drawer, Theme, useTheme } from "@mui/material";
import { ReactNode } from "react";
import theme from "theme";

type CustomAppBarProps = {
  open: boolean;
  variant: "permanent" | "persistent" | "temporary" | undefined;
  children: ReactNode;
};
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export default function CustomDrawer({ open, variant, children }: CustomAppBarProps) {
  const theme = useTheme();

  return (
    <Drawer
      variant={variant}
      sx={[
        { width: drawerWidth, flexShrink: 0, whiteSpace: "nowrap", boxSizing: "border-box" },
        open && { ...openedMixin(theme), "& .MuiDrawer-paper": openedMixin(theme) },
        !open && { ...closedMixin(theme), "& .MuiDrawer-paper": closedMixin(theme) },
      ]}
    >
      {children}
    </Drawer>
  );
}
