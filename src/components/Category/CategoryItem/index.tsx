import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import BoxCard from "@/components/BoxCard";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useMemo } from "react";
import { StageExercise, TopicUIType } from "@/shared/type";
import { LectureResponseType } from "@/core/type";

export default function CategoryItem({ lectureName, imgSrc, lectureId, currentStep, stage }: any) {
  const navigate = useNavigate();
  const gotoRecordProgressPage = () => {
    navigate({
      pathname: ROUTER.RECORD + `/${lectureName.toLowerCase()}`,
      search: lectureId,
    });
  };

  const currentProgress = useMemo(() => {
    return (currentStep * 100) / 2;
  }, []);

  return (
    <BoxCard classes='p-4'>
      <Box className='flex justify-between items-center' onClick={() => gotoRecordProgressPage()}>
        <Box>
          <Typography className='text-base-semibold'>{lectureName}</Typography>
          <Typography className='text-extra-small-regular'>{stage != StageExercise.Open ? `${currentStep}/${2} phrases` : `${2} phrases`}</Typography>
        </Box>
        <Avatar src={imgSrc} alt='gallery-icon' className='w-6 h-6' />
      </Box>
      {stage != StageExercise.Open && <LinearProgress variant='determinate' value={currentProgress} className='mt-3' />}
    </BoxCard>
  );
}
