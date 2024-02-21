import { MouseEvent, useRef, useState } from "react";
import { NavigateFunction, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";

import ArrowdownIcon from "@/assets/icon/arrow-down-icon.svg";
import Chervon from "@/assets/icon/chevron-left-icon.svg";
import LogoutIcon from "@/assets/icon/log-out-icon.svg";
import LogoApp from "@/assets/icon/logo-icon.svg";
import MenuIcon from "@/assets/icon/menu-icon.svg";
import HomeCheckedIcon from "@/assets/icon/active-home-icon.svg";
import HomeIcon from "@/assets/icon/home-icon.svg";
import RecordCheckedIcon from "@/assets/icon/microphone-2-color-icon.svg";
import RecordIcon from "@/assets/icon/microphone-2-icon.svg";
import MusicCheckedIcon from "@/assets/icon/music-play-color-icon.svg";
import MusicIcon from "@/assets/icon/music-play-icon.svg";
import CertificateIcon from "@/assets/icon/certificate-icon.svg";
import CertificateCheckedIcon from "@/assets/icon/certificate-color-icon.svg";
import LeaderBoardIcon from "@/assets/icon/leader-board-icon.svg";
import LeaderBoardColorIcon from "@/assets/icon/leader-board-color-icon.svg";
import CustomAppbar from "../custom-mui/appbar";
import CustomDrawer from "../custom-mui/drawer";
import CustomDrawerHeader from "../custom-mui/drawer-header";

import ROUTER from "@/shared/const/router.const";
import persist from "@/shared/utils/persist.util";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "@/core/store/index";
import useClickOutside from "@/shared/hook/use-click-out-side";
import MailIcon from "../icons/mail-icon";

const menu = [
  {
    name: "Home",
    icon: HomeIcon,
    iconChecked: HomeCheckedIcon,
    action: (navigate: NavigateFunction) => {
      navigate(ROUTER.HOME);
    },
  },
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
    name: "Certificate",
    icon: CertificateIcon,
    iconChecked: CertificateCheckedIcon,
    action: (navigate: NavigateFunction) => {
      navigate(ROUTER.CERTIFICATE);
    },
  },
  {
    name: "Leaderboard",
    icon: LeaderBoardIcon,
    iconChecked: LeaderBoardColorIcon,
    action: (navigate: NavigateFunction) => {
      navigate(ROUTER.LEADER_BOARD);
    },
  },
];

const DrawerNavigate = ({ ...props }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const settings = [
    {
      title: "My profile",
      action: () => {
        navigate(ROUTER.PROFILE);
        setOpenProfile(false);
      },
    },
    {
      title: "Sign out",
      icon: LogoutIcon,
      color: "#EF4444",
      action: () => {
        persist.logout();
        dispatch(setIsAuthenticated(false));
      },
    },
  ];
  const { pathname } = useLocation();
  const path = pathname.replace("/", "");
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isSmallScreen);

  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const profileRef = useRef<HTMLDivElement>(null);
  useClickOutside(profileRef, () => {
    setOpenProfile(false);
  });

  const avatarUrl = persist.getMyInfo()?.avatarUrl;
  const nickName = persist.getMyInfo()?.nickName;
  const email = persist.getMyInfo()?.email;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleToggleProfileMenu = (event: MouseEvent<HTMLElement>) => {
    setOpenProfile(!openProfile);
  };

  const renderProfile = () => {
    return (
      <Box
        className={`z-100 duration-300 absolute right-0 p-4 shadow-lg rounded-lg bg-white min-w-[200px] max-w-[90vw] ${
          openProfile ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Box className="p-4">
          <Typography className="text-extra-large-semibold">Profile</Typography>
        </Box>
        <Box className="flex gap-3 p-4 items-center ">
          <Avatar alt="avatar-icon" className="w-13 h-13" src={avatarUrl} />
          <Box>
            <Typography className="font-semibold text-sm">{nickName}</Typography>
            <Typography>{email}</Typography>
          </Box>
        </Box>
        {settings.map((item, index) => {
          return (
            <Box onClick={item.action} className="rounded-2xl cursor-pointer hover:bg-[#E2E8F0] p-4" key={index}>
              <Typography color={item.color}>{item.title}</Typography>
            </Box>
          );
        })}
      </Box>
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
            onClick={() => {
              isSmallScreen && handleDrawerClose();
              item.action(navigate);
            }}
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
                icon={<Avatar src={item.icon} alt="uncheck-icon" sx={{ width: 24, height: 24 }} />}
                checkedIcon={<Avatar src={item.iconChecked} alt="check-icon" sx={{ width: 24, height: 24 }} />}
              />
            </ListItemIcon>
            <ListItemText
              primary={item.name}
              sx={{ opacity: open ? 1 : 0 }}
              primaryTypographyProps={{ fontWeight: path === item.name.toLowerCase() ? 500 : 400 }}
            />
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
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              display: "flex",
              gap: 5,
              ...(open && { display: "none" }),
            }}
            disableRipple
          >
            <Avatar src={MenuIcon} sx={{ width: 24, height: 24 }} />
            <Typography sx={{ textTransform: "capitalize", fontSize: "20px", fontWeight: 600 }}>
              {" "}
              {path === "home" ? `Welcome, ${persist.getMyInfo().nickName}` : path}
            </Typography>
          </IconButton>
          <Typography sx={{ textTransform: "capitalize", fontSize: "20px", fontWeight: 600, ...(!open && { display: "none" }) }}>
            {path === "home" ? `Welcome, ${persist.getMyInfo().nickName}` : path}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box ref={profileRef} className="relative">
            <Tooltip title="Open settings">
              <Box
                onClick={handleToggleProfileMenu}
                sx={{
                  "&:hover": {
                    background: "#49454F14",
                  },
                }}
                className="cursor-pointer flex items-center rounded-lg px-2 py-1"
              >
                <IconButton disableRipple>
                  <Avatar
                    alt="avatar-icon"
                    sx={{
                      width: "24px",
                      height: "24px",
                    }}
                    src={avatarUrl}
                  />
                </IconButton>
                <Avatar
                  alt="arrow-down-icon"
                  src={ArrowdownIcon}
                  sx={{ rotate: openProfile ? " -180deg" : "", width: 12, height: 12, transition: "all linear 0.2s" }}
                />
              </Box>
            </Tooltip>
            {renderProfile()}
          </Box>
        </Toolbar>
      </CustomAppbar>
      <CustomDrawer key={Number(open)} open={open} onClose={handleDrawerClose}>
        <CustomDrawerHeader>
          {open && (
            <>
              <img alt="logo-app" src={LogoApp} />
              <IconButton disableRipple onClick={handleDrawerClose}>
                <Avatar src={Chervon} sx={{ width: "24px", height: "24px" }} />
              </IconButton>
            </>
          )}
          {open && (
            <Box className="fixed ml-2 mb-4 bottom-0 flex items-center justify-center gap-2">
              <MailIcon />
              <Typography className="text-sm text-textSecondary">contact@dudaji.vn</Typography>
            </Box>
          )}
        </CustomDrawerHeader>
        <Divider />
        {getList()}
      </CustomDrawer>
      <Box component="main" sx={{ minHeight: "100vh", flexGrow: 1, background: "#f3f4f6" }}>
        <CustomDrawerHeader />
        {/* main */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DrawerNavigate;
