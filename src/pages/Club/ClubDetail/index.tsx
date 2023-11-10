import CloseIcon from "@/assets/icon/close-icon.svg";
import { Avatar, Box, Container, IconButton, Tab, Tabs, Typography } from "@mui/material";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";

import ROUTER from "@/shared/const/router.const";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

type PATH = "study" | "member" | "info";

export default function ClubDetailPage() {
  const tabItems = ["Lectures", "Members", "Club info"];
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { clubId } = useParams();
  const [path, setPath] = useState<PATH>(pathname.split("/")[2] as PATH);

  const removeSlash = useCallback((value: string) => {
    return value.replace("/", "");
  }, []);

  const handleChange = (event: SyntheticEvent, path: PATH) => {
    setPath(path);
    navigate({
      pathname: ROUTER.CLUB_DETAIL + "/" + path + "/" + clubId,
    });
  };

  const onHandleClose = () => {
    navigate(ROUTER.CLUB);
  };

  useEffect(() => {
    setPath(pathname.split("/")[2] as PATH);
  }, [pathname]);

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white sticky top-0 z-10'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          {/* TODO: change clubname */}
          <Typography className='text-large-semibold grow'>{"clubName"}</Typography>
        </Box>
      </Container>
      <Box className='bg-white divider'>
        <Tabs value={path} onChange={handleChange} aria-label='tabs' variant='fullWidth'>
          <Tab label={tabItems[0]} id={`listen-tab-${path}`} aria-controls={`listen-tabpanel-${path}`} value={removeSlash(ROUTER.CLUB_STUDY)} />
          <Tab label={tabItems[1]} id={`listen-tab-${path}`} aria-controls={`listten-tabpanel-${path}`} value={removeSlash(ROUTER.CLUB_MEMBER)} />
          <Tab label={tabItems[2]} id={`listen-tab-${path}`} aria-controls={`listten-tabpanel-${path}`} value={removeSlash(ROUTER.CLUB_INFO)} />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
}
