import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Box, IconButton, Avatar, Typography, LinearProgress, CircularProgress } from "@mui/material";
import _ from "lodash";
import TranslationCard from "@/components/TranslationCard";
import { StageExercise } from "@/shared/type";
import { useGetAllVocabulariesByLectureQuery } from "@/core/services/recordProgress.service";
import ROUTER from "@/shared/const/router.const";
import CloseIcon from "@/assets/icon/close-icon.svg";
import MenuIcon from "@/assets/icon/list-icon.svg";

export default function RecordingProgressPage() {
  const navigate = useNavigate();
  const params = useParams();
  const search = useLocation();
  const lectureName = decodeURI(search.pathname).replace("/record/", "");
  const lectureId = search.search.replace("?", "");

  const { data, isFetching } = useGetAllVocabulariesByLectureQuery(lectureId);
  const currentProgress = useMemo(() => {
    if (data) {
      return (data.currentStep * 100) / data.vocabularies.length;
    }
    return 0;
  }, [data]);

  const onHandleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (data) {
      if (data.stage === StageExercise.Close && data.currentStep === data.vocabularies.length) {
        const path = `/${params.category}`;
        navigate(
          {
            pathname: ROUTER.RECORD + path + ROUTER.SUMMARY,
          },
          {
            state: {
              lectureId: data.lectureId.id,
            },
          }
        );
      }
    }
  }, [data]);

  if (isFetching)
    return (
      <Box className='m-auto'>
        <CircularProgress />
      </Box>
    );

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold grow'>{lectureName}</Typography>
          <IconButton>
            <Avatar src={MenuIcon} className='w-6 h-6' />
          </IconButton>
        </Box>
        {data && data.stage != StageExercise.Open && <LinearProgress variant='determinate' value={currentProgress} className='mt-3' />}
      </Container>
      {data && <TranslationCard {...data.vocabularies[data.currentStep]} currentStep={data.currentStep} totalStep={data.vocabularies.length} enrollmentId={data.enrollmentId} />}
      {/* {data && <TranslationCard {...data.vocabularies[data.currentStep]} currentStep={data.currentStep} totalStep={data.vocabularies.length} enrollmentId={data.enrollmentId} />} */}
    </Box>
  );
}
