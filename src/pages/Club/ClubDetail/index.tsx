import React, { SyntheticEvent, useEffect, useState } from "react";
import { Avatar, Box, Tab, Tabs, Typography } from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";

import ROUTER from "@/shared/const/router.const";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useGetClubDetailQuery } from "@/core/services/club.service";

type PATH = "study" | "member" | "info";

export default function ClubDetailPage() {
  const tabItems = ["Lectures", "Members", "Club info"];
  // router
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { clubId } = useParams();
  const [path, setPath] = useState<PATH>(pathname.split("/")[2] as PATH);

  const { data } = useGetClubDetailQuery(clubId!);

  const handleChange = (event: SyntheticEvent, path: PATH) => {
    setPath(path);
    navigate({
      pathname: ROUTER.CLUB_DETAIL + "/" + path + "/" + clubId,
    });
  };

  useEffect(() => {
    setPath(pathname.split("/")[2] as PATH);
  }, [pathname]);

  return (
    <Box className='flex flex-col grow'>
      <Box className='p-4 flex items-center gap-2 bg-white divider'>
        <Avatar src={CloseIcon} className='w-6 h-6' onClick={() => navigate(ROUTER.CLUB)} />
        {/* TODO: adjust club name */}
        <Typography className='text-large-semibold'>{data?.clubName}</Typography>
      </Box>
      <Box className='bg-white divider'>
        <Tabs value={path} onChange={handleChange} aria-label='tabs' variant='fullWidth'>
          <Tab label={tabItems[0]} id={`listen-tab-${path}`} aria-controls={`listen-tabpanel-${path}`} value={ROUTER.CLUB_STUDY} />
          <Tab label={tabItems[1]} id={`listen-tab-${path}`} aria-controls={`listten-tabpanel-${path}`} value={ROUTER.CLUB_MEMBER} />
          {/* <Tab label={tabItems[2]} id={`listen-tab-${path}`} aria-controls={`listten-tabpanel-${path}`} value={ROUTER.CLUB_INFO} /> */}
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
}
