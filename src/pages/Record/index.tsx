import React from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category from "@/components/Category";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { useAppSelector } from "@/store/hook";
import { IExerciseType } from "@/store/ExerciseStore";

export default function RecordingPage() {
  const goBack = useNavigate();
  const data = useAppSelector((state) => state.exercise.store);

  const renderCategory = () => {
    return Object.entries(data).map(([key, value]) => (
      <Category key={nanoid()} stage={key} categoryItems={value} />
    ));
  };

  return (
    <Box>
      <Box className="p-4 flex items-center gap-2 divider bg-white">
        <IconButton onClick={() => goBack(-1)}>
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
