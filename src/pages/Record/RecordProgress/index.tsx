import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Container, Box, IconButton, Avatar, Typography, LinearProgress } from "@mui/material";
import _ from "lodash";
import TranslationCard from "@/components/TranslationCard";
import { StageExercise } from "@/shared/type";
import CloseIcon from "@/assets/icon/close-icon.svg";
import MenuIcon from "@/assets/icon/list-icon.svg";
import Congratulation from "@/assets/icon/congratulation-icon.svg";
import { useGetAllVocabulariesInLectureQuery } from "@/core/services";
import Loading from "@/components/Loading";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import persist from "@/shared/utils/persist.util";
import SentenceItem from "@/components/SentenceItem";
import ROUTER from "@/shared/const/router.const";

export default function RecordingProgressPage() {
  const navigate = useNavigate();
  const myInfo = persist.getMyInfo().nickName;
  const { pathname } = useLocation();
  const lectureName = decodeURI(pathname).replace("/record/", "");
  let [searchParams] = useSearchParams();
  const lectureId = searchParams.get("lectureId") ?? "";
  const stage = searchParams.get("stage") ?? "0";

  const parentRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useGetAllVocabulariesInLectureQuery({ lectureId, stage: parseInt(stage) });

  const [renderVocabulary, setRenderVocabulary] = useState<VocabularyTypeWithNativeLanguageResponse[]>([]);

  const vocabularies: VocabularyTypeWithNativeLanguageResponse[] = useMemo(() => {
    const vocab = data?.vocabularies ?? [];
    return vocab;
  }, [data?.vocabularies]);

  const currentProgress = useMemo(() => {
    return data ? (data.currentStep * 100) / vocabularies.length : 0;
  }, [data?.currentStep, vocabularies]);

  const nextVocabulary = () => {
    if (vocabularies[renderVocabulary.length]) {
      setRenderVocabulary((predeta: VocabularyTypeWithNativeLanguageResponse[]) => [...predeta, vocabularies[predeta.length]]);
    }
  };

  const scrollToLastElement = () => {
    const lastChildElement = parentRef.current!.lastElementChild;
    lastChildElement?.scrollIntoView({ behavior: "smooth" });
  };

  const onHandleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    //initRenderVocabuary
    if (!renderVocabulary.length && vocabularies.length) {
      const newArr = vocabularies.filter((voca) => !!voca.voiceSrc);
      if (newArr.length) {
        const nextIndex = vocabularies.findIndex((voca) => !voca.voiceSrc);
        newArr.push(vocabularies[nextIndex]);
        setRenderVocabulary(() => newArr);
      } else {
        setRenderVocabulary(() => [vocabularies[0]]);
      }
    }
  }, [vocabularies]);

  useEffect(() => {
    if (renderVocabulary.length > 0 && parentRef.current) {
      scrollToLastElement();
    }
  }, [renderVocabulary]);

  // useEffect(() => {
  //   if (data) {
  //     if (data.stage === StageExercise.Close && data.currentStep === data.vocabularies.length) {
  //       const path = `/${params.category}`;
  //       navigate(
  //         {
  //           pathname: ROUTER.RECORD + path + ROUTER.SUMMARY,
  //         },
  //         {
  //           state: {
  //             lectureId: data.lectureId,
  //           },
  //         }
  //       );
  //     }
  //   }
  // }, [data]);
  console.log(renderVocabulary);

  const openSentenceList = () => {
    navigate(
      {
        pathname: ROUTER.RECORD_LIST,
      },
      {
        state: {
          lectureId,
          stage,
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white sticky top-0 z-10'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold grow'>{lectureName}</Typography>
          <IconButton>
            <Avatar src={MenuIcon} className='w-6 h-6' onClick={openSentenceList} />
          </IconButton>
        </Box>
        {data && data.stage != StageExercise.Open && <LinearProgress variant='determinate' value={currentProgress} className='mt-3' />}
      </Container>

      <Box ref={parentRef} className='text-center'>
        {renderVocabulary.map((val: VocabularyTypeWithNativeLanguageResponse) => {
          if (val) {
            return <TranslationCard {...val} key={val.vocabularyId} onClick={nextVocabulary} enrollmentId={data!.enrollmentId} />;
          }
          return (
            <Box className='bg-gray-100 flex flex-col items-center justify-center h-[500px] p-6' key={myInfo}>
              <Avatar src={Congratulation} className='w-16 h-16'></Avatar>
              <Typography className='text-extra-large-semibold'>Nice job, {myInfo}</Typography>
              <Typography variant={"body2"}>You finally recorded all the lectures</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
