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
import { useAppSelector } from "@/store/hook";
import { ExerciseStage, ExerciseType } from "@/shared/type";
import { useMemo } from "react";

export default function RecordingProgressPage() {
  const goBack = useNavigate();
  const data: Partial<ExerciseType> = useAppSelector(
    (state) => state.exercise.filter
  );
  const currentProgress = useMemo(() => {
    if (data.currentPhrase && data.totalPhrase)
      return (data.currentPhrase * 100) / data.totalPhrase;
  }, []);

  if (data === undefined || data === null) return <></>;

  return (
    <Box className="flex flex-col grow">
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => goBack(-1)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">{data.title}</Typography>
        </Box>
        {data.stage != ExerciseStage.Open && (
          <LinearProgress value={currentProgress} variant="determinate" />
        )}
      </Container>
      <TranslationCard {...data} />
    </Box>
  );
}
