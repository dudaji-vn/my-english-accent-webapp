import React from "react";
import Box from "@mui/material/Box";
import { Avatar, Typography } from "@mui/material";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import KoreaFlag from "@/assets/icon/korea-flag-icon.svg";
import { useAppSelector } from "@/store/hook";

export default function Nationality() {
  const national = useAppSelector((state) => state.user.national);
  const getFlag = () => {
    switch (national) {
      case "kr":
        return KoreaFlag;
      case "vi":
        return Vietnamflag;
    }
  };
  return (
    <Box display={"flex"} alignItems={"center"} gap={1}>
      <Avatar alt="national-flag-icon" src={getFlag()} className="w-4 h-4" />
      <Typography>Nationality</Typography>
    </Box>
  );
}
