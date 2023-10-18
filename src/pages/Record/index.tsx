import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category from "@/components/Category";
import { useNavigate } from "react-router-dom";
import { StageExercise } from "@/shared/type";
import ROUTER from "@/shared/const/router.const";

import * as _ from "lodash";
import { nanoid } from "@reduxjs/toolkit";
import persist from "@/shared/utils/persist.util";
import { useGetInitialDataQuery } from "@/core/services/initialize.service";

export default function RecordingPage() {
  const userId = persist.getMyInfo().userId;

  const { data } = useGetInitialDataQuery(userId);

  const goBack = useNavigate();

  if (_.isNull(data) || _.isUndefined(data)) return <></>;

  const renderCategory = () => {
    return Object.entries(data).map(([key, value]) => <Category key={nanoid()} stage={key as unknown as StageExercise} lectureItems={value} />);
  };

  return (
    <Box>
      <Box className='p-4 flex items-center gap-2 divider bg-white'>
        <IconButton onClick={() => goBack(ROUTER.ROOT)}>
          <Avatar src={ChevronIcon} className='w-6 h-6' />
        </IconButton>
        <Typography className='text-large-semibold'>Practice pronounciation</Typography>
      </Box>
      {renderCategory()}
    </Box>
  );
}
