import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category from "@/components/Category";
import { useNavigate } from "react-router-dom";
import { StageExercise, TopicUIType } from "@/shared/type";
import ROUTER from "@/shared/const/router.const";
import { useGetTopicsQuery } from "@/core/services";

import * as _ from "lodash";
import { nanoid } from "@reduxjs/toolkit";

export default function RecordingPage() {
  const goBack = useNavigate();

  const { data } = useGetTopicsQuery();

  if (_.isNull(data) || _.isUndefined(data)) return <></>;

  const renderCategory = () => {
    const groupStage = _.groupBy(data, "stage");
    return Object.entries(groupStage).map(([key, value]) => (
      <Category
        key={nanoid()}
        stage={key as unknown as StageExercise}
        topicItems={value}
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
