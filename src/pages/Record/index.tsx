import React from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category from "@/components/Category";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { dummyExercise } from "@/config/dummyData";
import { groupBy } from "@/shared/utils/groupBy.util";
import { StageExercise } from "@/shared/type";
import ROUTER from "@/shared/const/router.const";

export default function RecordingPage() {
  const goBack = useNavigate();
  const dataDummy = groupBy(dummyExercise, "stage");

  const renderCategory = () => {
    return Object.entries(dataDummy).map(([key, value]) => (
      <Category
        key={nanoid()}
        stage={key as unknown as StageExercise}
        categoryItems={value}
      />
    ));
  };

  return (
    <Box>
      <Box className="p-4 flex items-center gap-2 divider bg-white">
        <IconButton onClick={() => goBack(ROUTER.ROOT)}>
          <Avatar src={ChevronIcon} className="w-6 h-6" />
        </IconButton>
        <Typography className="text-large-semibold">
          Practice pronounciation
        </Typography>
      </Box>
      {renderCategory()}
    </Box>
  );
}
