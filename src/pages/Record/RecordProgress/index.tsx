import TranslationCard from "@/components/TranslationCard";
import {
  Container,
  Box,
  IconButton,
  Avatar,
  Typography,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { ExerciseType, StageExercise, VocabularyType } from "@/shared/type";
import { persist } from "@/shared/utils/persist.util";
import { useAppSelector } from "@/store/hook";

export default function RecordingProgressPage() {
  const goBack = useNavigate();

  // const [persistData] = useState<VocabularyType & ExerciseType>(() => {
  //   const data = persist.getVocabulary();
  //   if (data) return JSON.parse(data);
  // });

  const data = useAppSelector((state) => state.exercise.filter);

  const currentProgress = useMemo(() => {
    if (data.currentPhrase?.toString() && data.totalPhrase) {
      return (data.currentPhrase * 100) / data.totalPhrase;
    }
    return 0;
  }, []);

  return (
    <Box className="flex flex-col grow">
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => goBack(-1)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">
            {data.exerciseName}
          </Typography>
        </Box>
        {data.stage != StageExercise.Open && (
          <LinearProgress value={currentProgress} variant="determinate" />
        )}
      </Container>
      <TranslationCard {...data} />
    </Box>
  );
}
