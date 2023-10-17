import TranslationCard from "@/components/TranslationCard";
import { Container, Box, IconButton, Avatar, Typography, LinearProgress } from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StageExercise } from "@/shared/type";
import _ from "lodash";
import { useAppSelector } from "@/store/hook";
import { useGetAllVocabulariesByLectureQuery } from "@/core/services/recordProgress.service";
import { useMemo } from "react";

export default function RecordingProgressPage() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation();
  const topicId = search.search.replace("?", "");

  //redux storage
  const topicFilterStore = useAppSelector((state) => state.recordPage.filter);
  const currentIndexStore = useAppSelector((state) => state.recordPage.vocabularyIndex);

  const { data } = useGetAllVocabulariesByLectureQuery(topicId);

  const currentProgress = useMemo(() => {
    if (data) {
      return (data.currentStep * 100) / data.vocabularies.length;
    }
    return 0;
  }, [data]);

  const onHandleClose = () => {
    navigate(-1);
  };

  // useEffect(() => {
  //   console.log(topicFilterStore.stage)
  //   if (topicFilterStore.stage === StageExercise.Close) {
  //     const path = `/${params.category}`;
  //     navigate({
  //       pathname: ROUTER.RECORD + path + ROUTER.SUMMARY,
  //     });
  //   }
  // }, [topicFilterStore.stage]);

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>{topicFilterStore.name}</Typography>
        </Box>
        {topicFilterStore.stage != StageExercise.Open && <LinearProgress variant='determinate' value={currentProgress} className='mt-3' />}
      </Container>
      {data && <TranslationCard {...data.vocabularies[data.currentStep]} />}
    </Box>
  );
}
