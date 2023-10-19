import React, { SyntheticEvent, useEffect, useState } from "react";
import { Avatar, Box, Button, Checkbox, Container, IconButton, Paper, Tab, Tabs, TextField, Typography } from "@mui/material";
import AddIcon from "@/assets/icon/add-btn-icon.svg";
import CloseIcon from "@/assets/icon/close-icon.svg";
import RightArrowIcon from "@/assets/icon/arrow-right-icon.svg";

import ROUTER from "@/shared/const/router.const";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import BoxCard from "@/components/BoxCard";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import FooterCard from "@/components/FooterBtn";
import TabCustom from "@/components/TabCustom";

type PATH = "study" | "member" | "info";

export default function ClubDetailPage() {
  const tabItems = ["Lectures", "Members", "Club info"];
  // router
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [path, setPath] = useState<PATH>(pathname.split("/")[2] as PATH);

  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = useState(false);

  const handleChange = (event: SyntheticEvent, newValue: PATH) => {
    setPath(newValue);
    navigate({
      pathname: ROUTER.CLUB_DETAIL + "/" + newValue,
    });
  };

  useEffect(() => {
    setPath(pathname.split("/")[2] as PATH);
  }, [pathname]);

  return (
    <Box className='flex flex-col grow'>
      <Box className='p-4 flex items-center gap-2 bg-white divider'>
        <Avatar src={CloseIcon} className='w-6 h-6' onClick={() => navigate(ROUTER.CLUB)} />
        <Typography className='text-large-semibold'>TechTalk and Design Club</Typography>
      </Box>
      <Box className='bg-white divider'>
        <Tabs value={path} onChange={handleChange} aria-label='tabs' variant='fullWidth'>
          <Tab label={tabItems[0]} id={`listen-tab-${path}`} aria-controls={`listen-tabpanel-${path}`} value={ROUTER.CLUB_STUDY} />
          <Tab label={tabItems[1]} id={`listen-tab-${path}`} aria-controls={`listten-tabpanel-${path}`} value={ROUTER.CLUB_MEMBER} />
          <Tab label={tabItems[2]} id={`listen-tab-${path}`} aria-controls={`listten-tabpanel-${path}`} value={ROUTER.CLUB_INFO} />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
}
