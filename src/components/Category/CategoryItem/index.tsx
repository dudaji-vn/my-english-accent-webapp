import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import BoxCard from "@/components/BoxCard";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useMemo } from "react";
import { StageExercise, TopicUIType } from "@/shared/type";

export default function CategoryItem({
  topicId,
  name,
  imgSrc,
  totalPhrase,
  currentPhrase,
  stage,
}: TopicUIType) {
  const navigate = useNavigate();
  const gotoRecordProgressPage = () => {
    navigate({
      pathname: ROUTER.RECORD + `/${name.toLowerCase()}`,
      search: topicId,
    });
  };

  const currentProgress = useMemo(() => {
    return (currentPhrase * 100) / totalPhrase;
  }, []);

  return (
    <BoxCard classes="p-4">
      <Box
        className="flex justify-between items-center"
        onClick={() => gotoRecordProgressPage()}
      >
        <Box>
          <Typography className="text-base-semibold">{name}</Typography>
          <Typography className="text-extra-small-regular">
            {stage != StageExercise.Open
              ? `${currentPhrase}/${totalPhrase} phrases`
              : `${totalPhrase} phrases`}
          </Typography>
        </Box>
        <Avatar src={imgSrc} alt="gallery-icon" className="w-6 h-6" />
      </Box>
      {stage != StageExercise.Open && (
        <LinearProgress
          variant="determinate"
          value={currentProgress}
          className="mt-3"
        />
      )}
    </BoxCard>
  );
}
