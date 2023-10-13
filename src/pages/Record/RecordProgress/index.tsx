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
import { useNavigate, useParams } from "react-router-dom";
import { StageExercise } from "@/shared/type";
import { useGetVocabulariesQuery } from "@/core/services";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import ROUTER from "@/shared/const/router.const";
import { saveVocabularies } from "@/store/ExerciseStore";
import { useEffect } from "react";

export default function RecordingProgressPage() {
  const navigate = useNavigate();
  const params = useParams();

  const topicFilterStore = useAppSelector((state) => state.exercise.filter);
  const currentIndexStore = useAppSelector(
    (state) => state.exercise.vocabularyIndex
  );

  const { data, refetch } = useGetVocabulariesQuery(topicFilterStore.topicId);

  const currentProgress = () => {
    if (data) {
      if (data.currentPhrase.toString() && data.totalPhrase) {
        return (data.currentPhrase * 100) / data.totalPhrase;
      }
    }
    return 0;
  };

  const onHandleClose = () => {
    refetch();
    navigate(-1);
  };

  useEffect(() => {
    if (data) {
      if (data.stage === StageExercise.Close) {
        const path = `/${params.category}`;
        navigate({
          pathname: ROUTER.RECORD + path + ROUTER.SUMMARY,
        });
      }
    }
  }, [data, data?.stage]);

  console.log("data::", data);
  return (
    <Box className="flex flex-col grow">
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">
            {topicFilterStore.name}
          </Typography>
        </Box>
        {data && data.stage != StageExercise.Open && (
          <LinearProgress value={currentProgress()} variant="determinate" />
        )}
      </Container>
      {data && (
        <TranslationCard
          {...data.vocabularies[currentIndexStore]}
          refetch={refetch}
        />
      )}
    </Box>
  );
}
