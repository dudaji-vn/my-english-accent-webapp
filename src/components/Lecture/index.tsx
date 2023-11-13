import { createSearchParams, useNavigate } from "react-router-dom";
import { Box, Typography, Avatar } from "@mui/material";

import BoxCard from "@/components/BoxCard";
import ROUTER from "@/shared/const/router.const";
import { StageExercise } from "@/shared/type";
import { EnrollmentResponseType, LectureResponseType } from "@/core/type";

export default function Lecture({ currentStep, lectureId, lectureName, stage, imgSrc, totalStep }: LectureResponseType & EnrollmentResponseType) {
  const navigate = useNavigate();

  const gotoRecordProgressPage = () => {
    navigate({
      pathname: ROUTER.RECORD + `/${lectureName.toLowerCase()}`,
      search: `?${createSearchParams({ lectureId } as any)}`,
    });
  };

  return (
    <BoxCard classes='p-4'>
      <Avatar src={imgSrc} variant='square' alt='gallery-icon' className='w-9 h-9' />
      <Box className='flex justify-between items-end mt-4' onClick={() => gotoRecordProgressPage()}>
        <Box>
          <Typography className='text-base-semibold h-12'>{lectureName}</Typography>
          <Typography className='text-extra-small-regular'>{stage != StageExercise.Open ? `${currentStep}/${totalStep} sentences` : `${totalStep} sentences`}</Typography>
        </Box>
      </Box>
    </BoxCard>
  );
}