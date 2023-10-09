import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import BoxCard from "@/components/Card";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useMemo } from "react";
import { ExerciseType, StageExercise } from "@/shared/type";
import { useAppDispatch } from "@/store/hook";
import { filterExerciseBy } from "@/store/ExerciseStore";

export interface CategoryItemPropType {
  idExercise: string;
  exerciseName: string;
  imgSrc: string;
  totalPhrase: number;
  currentPhrase: number;
  stage: StageExercise;
}

export default function CategoryItem({
  idExercise,
  exerciseName,
  imgSrc,
  totalPhrase,
  currentPhrase,
  stage,
}: CategoryItemPropType) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const gotoRecordProgressPage = () => {
    navigate({
      pathname: ROUTER.RECORD + `/${exerciseName.toLowerCase()}`,
    });
    dispatch(
      filterExerciseBy({
        idExercise,
      } as Pick<ExerciseType, "idExercise">)
    );
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
          <Typography className="text-base-semibold">{exerciseName}</Typography>
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
