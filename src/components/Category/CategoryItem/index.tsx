import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Avatar, LinearProgress } from "@mui/material";

import BoxCard from "@/components/BoxCard";
import ROUTER from "@/shared/const/router.const";
import { StageExercise } from "@/shared/type";
import { EnrollmentResponseType, LectureResponseType } from "@/core/type";
import { useGetAllVocabularyQuery } from "@/core/services";

export default function CategoryItem({ currentStep, lectureId, lectureName, stage, imgSrc }: LectureResponseType & EnrollmentResponseType) {
  const navigate = useNavigate();
  const { data, isFetching } = useGetAllVocabularyQuery();

  const totalVocabulary = useMemo(() => {
    const isFound = data?.find((val) => val.lectureId === lectureId);
    return isFound ? isFound.vocabularies.length : 0;
  }, [isFetching]);

  const currentProgress = useMemo(() => {
    return (currentStep * 100) / totalVocabulary;
  }, [currentStep, totalVocabulary]);

  const gotoRecordProgressPage = () => {
    navigate({
      pathname: ROUTER.RECORD + `/${lectureName.toLowerCase()}`,
      search: lectureId,
    });
  };

  return (
    <BoxCard classes='p-4'>
      <Box className='flex justify-between items-center' onClick={() => gotoRecordProgressPage()}>
        <Box>
          <Typography className='text-base-semibold'>{lectureName}</Typography>
          <Typography className='text-extra-small-regular'>{stage != StageExercise.Open ? `${currentStep}/${totalVocabulary} words and sentences` : `${totalVocabulary} words and sentences`}</Typography>
        </Box>
        <Avatar src={imgSrc} variant="square" alt='gallery-icon' className='w-9 h-9' />
      </Box>
      {stage != StageExercise.Open && <LinearProgress variant='determinate' value={currentProgress} className='mt-3' />}
    </BoxCard>
  );
}
