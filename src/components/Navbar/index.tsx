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

import AccountIcon from "@/assets/icon/settings-icon.svg";
import LogoutIcon from "@/assets/icon/log-out-icon.svg";
import LogoApp from "@/assets/icon/logo-icon.svg";
import ArrowdownIcon from "@/assets/icon/arrow-down-icon.svg";
import persist from "@/shared/utils/persist.util";
import { useAppDispatch } from "@/store/hook";
import { logout } from "@/store/UserStore";
import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";

const settings = [
  {
    title: "Account",
    icon: AccountIcon,
    action: () => {},
  },
  {
    title: "Log out",
    icon: LogoutIcon,
    action: () => {
      persist.logout();
      window.location.reload();
    },
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar className='sticky bg-white shadow-none divider'>
      <Container>
        <Toolbar disableGutters>
          <IconButton>
            <img alt='logo-app' src={LogoApp} />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <Tooltip title='Open settings'>
              <Box className='flex items-center'>
                <IconButton onClick={handleOpenUserMenu} disableRipple>
                  <Avatar
                    alt='avatar-icon'
                    sx={{
                      width: "24px",
                      height: "24px",
                    }}
                    children={<Typography color={"white"}>H</Typography>}
                  />
                </IconButton>
                <img alt='arrow-down-icon' src={ArrowdownIcon} />
              </Box>
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
                  onClickCapture={() => {
                    setting.action();
                    navigate(ROUTER.LOGIN);
                  }}
                >
                  <Avatar
                    alt={setting.title + "icon"}
                    src={setting.icon}
                    sx={{
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <Typography textAlign='center' paddingLeft={"12px"}>
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
