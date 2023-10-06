import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import BoxCard from "@/components/Card";
import { Route, useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useMemo } from "react";
import { ExerciseStage, ExerciseType } from "@/shared/type";
import { useAppDispatch } from "@/store/hook";
import { filterExerciseBy } from "@/store/ExerciseStore";

export interface CategoryItemPropType {
  title: string;
  categoryImg: string;
  currentPhrase: number;
  totalPhrase: number;
  stage: string;
  id: string;
}

export default function CategoryItem({
  title,
  currentPhrase,
  categoryImg,
  totalPhrase,
  stage,
  id,
}: CategoryItemPropType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gotoRecordProgressPage = () => {
    navigate({
      pathname: ROUTER.RECORD + `/${title.toLowerCase()}`,
    });

    dispatch(
      filterExerciseBy({
        id,
        stage,
      } as unknown as Partial<ExerciseType>)
    );
  };

  const currentProgress = useMemo(() => {
    return (currentPhrase * 100) / totalPhrase;
  }, []);

  return (
    <BoxCard classes="bg-white p-4">
      <Box
        className="flex justify-between items-center"
        onClick={() => gotoRecordProgressPage()}
      >
        <Box>
          <Typography className="text-base-semibold">{title}</Typography>
          <Typography className="text-extra-small-regular">
            {currentPhrase}/{totalPhrase} phrases
          </Typography>
        </Box>
        <Avatar src={categoryImg} alt="gallery-icon" className="w-6 h-6" />
      </Box>
      {parseInt(stage) != ExerciseStage.Open && (
        <LinearProgress
          variant="determinate"
          value={currentProgress}
          className="mt-3"
        />
      )}
    </BoxCard>
  );
}
