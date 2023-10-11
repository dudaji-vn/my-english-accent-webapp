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
import { StageExercise, TopicUIType, VocabularyType } from "@/shared/type";
import { useGetVocabulariesQuery } from "@/core/services";
import _ from "lodash";

export default function RecordingProgressPage() {
  const goBack = useNavigate();

  const { data, isLoading } = useGetVocabulariesQuery(
    "topic_eSlx-3QrYaTls2VLfK2Lp"
  );
  if (!data) return <></>;

  console.log(data);
  // const [data] = useState<Omit<TopicUIType, "imgSrc"> & VocabularyType>(() => {
  //   const vocabulary = persist.getVocabulary();
  //   if (vocabulary) return JSON.parse(vocabulary);
  // });

  // const currentProgress = useMemo(() => {
  //   if (data.currentPhrase?.toString() && data.totalPhrase) {
  //     return (data.currentPhrase * 100) / data.totalPhrase;
  //   }
  //   return 0;
  // }, []);

  return (
    <Box className="flex flex-col grow">
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => goBack(-1)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">{data.name}</Typography>
        </Box>
        {data.stage != StageExercise.Open && (
          <LinearProgress value={0} variant="determinate" />
        )}
      </Container>
      <TranslationCard {...data} />
    </Box>
  );
}
