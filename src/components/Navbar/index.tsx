import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import AvatarIcon from "@/assets/icon/avatar-icon.svg";
import AccountIcon from "@/assets/icon/settings-icon.svg";
import LogoutIcon from "@/assets/icon/log-out-icon.svg";
import LogoApp from "@/assets/icon/MEA-logo-icon.svg";
import ArrowdownIcon from "@/assets/icon/arrow-down-icon.svg";

const settings = [
  {
    title: "Account",
    icon: AccountIcon,
  },
  {
    title: "Log out",
    icon: LogoutIcon,
  },
];

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "white",
        boxShadow: "none",
        borderBottom: "1px solid #F3F4F6",
      }}
    >
      <Container>
        <Toolbar disableGutters>
          <IconButton>
            <img alt="logo-app" src={LogoApp} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Tooltip title="Open settings">
              <>
                <IconButton onClick={handleOpenUserMenu} disableRipple>
                  <Avatar alt="avatar-icon" src={AvatarIcon} />
                </IconButton>
                <img alt="arrow-down-icon" src={ArrowdownIcon} />
              </>
            </Tooltip>
            <Menu
              sx={{ mt: "40px" }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.title}
                  onClick={handleCloseUserMenu}
                  sx={{ paddingY: "0.5rem" }}
                >
                  <Avatar
                    alt={setting.title + "icon"}
                    src={setting.icon}
                    className="w-4 h-4"
                  />
                  <Typography textAlign="center" paddingLeft={"12px"}>
                    {setting.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
