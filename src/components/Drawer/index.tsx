import { NavigateFunction, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, MouseEvent } from "react";

import {
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  ListItemText,
  ListItemIcon,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  Checkbox,
  Drawer,
} from "@mui/material";

import CustomDrawerHeader from "../CustomMui/DrawerHeader";
import CustomDrawer from "../CustomMui/Drawer";
import CustomAppbar from "../CustomMui/Appbar";
import LogoApp from "@/assets/icon/logo-icon.svg";
import Chervon from "@/assets/icon/chevron-left-icon.svg";
import ArrowdownIcon from "@/assets/icon/arrow-down-icon.svg";
import AccountIcon from "@/assets/icon/settings-icon.svg";
import LogoutIcon from "@/assets/icon/log-out-icon.svg";
import MenuIcon from "@/assets/icon/menu-icon.svg";
import MusicIcon from "@/assets/icon/music-play-icon.svg";
import MusicCheckedIcon from "@/assets/icon/music-play-color-icon.svg";
import RecordIcon from "@/assets/icon/microphone-2-icon.svg";
import RecordCheckedIcon from "@/assets/icon/microphone-2-color-icon.svg";
import ClubIcon from "@/assets/icon/people-icon.svg";
import ClubCheckedIcon from "@/assets/icon/people-color-icon.svg";

import ROUTER from "@/shared/const/router.const";
import persist from "@/shared/utils/persist.util";
import { useTheme } from "@emotion/react";

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

const menu = [
  {
    name: "Record",
    icon: RecordIcon,
    iconChecked: RecordCheckedIcon,
    action: (navigate: NavigateFunction) => {
      navigate(ROUTER.RECORD);
    },
  },
  {
    name: "Listening",
    icon: MusicIcon,
    iconChecked: MusicCheckedIcon,
    action: (navigate: NavigateFunction) => {
      navigate(ROUTER.LISTENING);
    },
  },
  {
    name: "Club",
    icon: ClubIcon,
    iconChecked: ClubCheckedIcon,
    action: (navigate: NavigateFunction) => {
      navigate(ROUTER.CLUB);
    },
  },
];

const DrawerNavigate = ({ ...props }: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.replace("/", "");
  const [open, setOpen] = useState(false);
  const avatar = persist.getMyInfo().avatarUrl;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getMenu = () => {
    return (
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
              navigate(ROUTER.AUTH + ROUTER.LOGIN);
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
    );
  };

  const getList = () => (
    <List>
      {menu.map((item) => (
        <ListItem key={item.name} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            selected={path === item.name.toLowerCase()}
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => item.action(navigate)}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <Checkbox
                checked={path === item.name.toLowerCase()}
                icon={<Avatar src={item.icon} alt='uncheck-icon' sx={{ width: 24, height: 24 }} />}
                checkedIcon={<Avatar src={item.iconChecked} alt='check-icon' sx={{ width: 24, height: 24 }} />}
              />
            </ListItemIcon>
            <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontWeight: path === item.name.toLowerCase() ? 500 : 400 }} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
  return (
    <Box display={"flex"}>
      <CustomAppbar open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              display: "flex",
              gap: 5,
              ...(open && { display: "none" }),
            }}
            disableRipple
          >
            <Avatar src={MenuIcon} sx={{ width: 24, height: 24 }} />
            <Typography sx={{ textTransform: "capitalize", fontSize: "20px", fontWeight: 600 }}>{path}</Typography>
          </IconButton>
          <Typography sx={{ textTransform: "capitalize", fontSize: "20px", fontWeight: 600, ...(!open && { display: "none" }) }}>{path}</Typography>
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
                    src={avatar}
                  />
                </IconButton>
                <Avatar alt='arrow-down-icon' src={ArrowdownIcon} sx={{ width: 12, height: 12 }} />
              </Box>
            </Tooltip>
            {getMenu()}
          </Box>
        </Toolbar>
      </CustomAppbar>
      <CustomDrawer open={open} onClose={handleDrawerClose}>
        <CustomDrawerHeader>
          {open && (
            <>
              <img alt='logo-app' src={LogoApp} />
              <IconButton disableRipple onClick={handleDrawerClose}>
                <Avatar src={Chervon} sx={{ width: "24px", height: "24px" }} />
              </IconButton>
            </>
          )}
        </CustomDrawerHeader>
        <Divider />
        {getList()}
      </CustomDrawer>
      <Box component='main' sx={{ flexGrow: 1 }}>
        <CustomDrawerHeader />
        {/* main */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DrawerNavigate;
