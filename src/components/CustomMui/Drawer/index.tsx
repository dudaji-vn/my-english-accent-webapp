import { CSSObject, Drawer, Theme, useTheme, useMediaQuery } from "@mui/material";
import { ReactNode } from "react";

type CustomAppBarProps = {
  open: boolean;
  children: ReactNode;
  onClose: Function;
};
const drawerWidth = 260;

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

export default function CustomDrawer({ open, children, onClose }: CustomAppBarProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor={"left"}
      variant={isSmallScreen ? "temporary" : "permanent"}
      open={open}
      onClose={() => onClose()}
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
