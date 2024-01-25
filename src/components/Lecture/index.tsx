import BoxCard from "@/components/BoxCard";
import LectureIcon from "@/components/icons/lecture-icon";
import ScoreIcon from "@/components/icons/score-icon";
import { EnrollmentResponseType, LectureResponseType } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import { StageExercise } from "@/shared/type";
import { Avatar, Box, Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function Lecture({
  currentStep,
  lectureId,
  lectureName,
  stage,
  imgSrc,
  totalStep,
}: LectureResponseType & EnrollmentResponseType) {
  const navigate = useNavigate();

  const gotoRecordProgressPage = () => {
    navigate({
      pathname: ROUTER.RECORD + `/${encodeURIComponent(lectureName)}`,
      search: `?${createSearchParams({ lectureId } as any)}`,
    });
  };

  return (
    <BoxCard
      onClick={() => gotoRecordProgressPage()}
      classes="cursor-pointer p-4 hover:shadow-xl transition duration-300 ease-in-out"
    >
      <Avatar src={imgSrc} variant="square" alt="gallery-icon" className="w-9 h-9" />
      <Box className="flex justify-between items-end mt-4">
        <Box>
          <Typography className="text-base-semibold h-12">{lectureName}</Typography>
          <Box className="flex items-center gap-1 mb-1">
            <LectureIcon />
            <Typography className="text-extra-small-regular">
              {stage !== StageExercise.Open ? `${currentStep}/${totalStep} sentences` : `${totalStep} sentences`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="flex items-center gap-1">
        <ScoreIcon type="outline" />
        <Typography className="text-extra-small-regular">
          {stage !== StageExercise.Open ? `${currentStep}/${totalStep} points` : `${totalStep} points`}
        </Typography>
      </Box>
    </BoxCard>
  );
}
