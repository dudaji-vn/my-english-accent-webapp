import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  Button,
  Container,
  Chip,
} from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import UserAddIcon from "@/assets/icon/user-add-icon.svg";
import RightIcon from "@/assets/icon/arrow-right-icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useState } from "react";
import WordTag from "@/components/WordTag";
import { nanoid } from "@reduxjs/toolkit";

export default function IndividualPage() {
  const navigate = useNavigate();

  const renderWords = () => {
    return ["", "", ""].map((word) => (
      <WordTag
        key={nanoid()}
        sentence={nanoid()}
        ipa={nanoid()}
        voiceSrc={nanoid()}
        classes="divider last:rounded-b-lg"
      />
    ));
  };
  return (
    <Container className="py-4 flex flex-col grow justify-between">
      <Box className="bg-white">
        <Box className="flex flex-col p-4 rounded-t-lg">
          <Typography className="text-small-medium">Browse by</Typography>
          <Box className="flex gap-2 mt-4">
            <Chip
              className="text-small-semibold rounded-lg  text-primary bg-purple-50"
              label="General"
              variant="filled"
            />
            <Chip
              className="text-small-semibold rounded-lg"
              label="Develop"
              variant="outlined"
            />
            <Chip
              className="text-small-semibold rounded-lg"
              label="Design"
              variant="outlined"
            />
          </Box>
        </Box>
        {renderWords()}
      </Box>
    </Container>
  );
}
