import CloseIcon from "@/assets/icon/close-icon.svg";
import Congratulation from "@/assets/icon/congratulation-icon.svg";
import MenuIcon from "@/assets/icon/list-icon.svg";
import Loading from "@/components/Loading";
import ModalAnnouncement from "@/components/Modal/ModalAnnouncement";
import ModalCongratulation from "@/components/Modal/ModalCongratulation";
import TranslationCard from "@/components/TranslationCard";
import { useGetAllVocabulariesInLectureQuery } from "@/core/services";
import { useAppSelector } from "@/core/store";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import { StageExercise } from "@/shared/type";
import persist from "@/shared/utils/persist.util";
import { Avatar, Box, Button, Container, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ExitStatus } from "typescript";

export default function RecordingProgressPage() {
  const navigate = useNavigate();
  const myInfo = persist.getMyInfo().nickName;
  const { pathname } = useLocation();
  const lectureName = decodeURIComponent(pathname).replace("/record/", "");
  let [searchParams] = useSearchParams();
  const lectureId = searchParams.get("lectureId") ?? "";
  const parentRef = useRef<HTMLDivElement>(null);
  const enrollmentData = useAppSelector((state) => state.GlobalStore.recordPage);

  const { data, isFetching } = useGetAllVocabulariesInLectureQuery(lectureId);
  const [isFinish, setIsFinish] = useState(data?.stage === StageExercise.Close);
  const [renderVocabulary, setRenderVocabulary] = useState<VocabularyTypeWithNativeLanguageResponse[]>([]);
  const vocabularies: VocabularyTypeWithNativeLanguageResponse[] = useMemo(() => {
    const vocab = data?.vocabularies ?? [];

    //init renderVocabulary
    const newArr = vocab.filter((voca) => !!voca.voiceSrc);
    if (newArr.length) {
      const nextIndex = vocab.findIndex((voca) => !voca.voiceSrc);
      if (nextIndex !== -1) {
        newArr.push(vocab[nextIndex]);
      }
      setRenderVocabulary(() => newArr);
    } else if(vocab.length > 0) {
      setRenderVocabulary(() => [vocab[0]]);
    }

    return vocab;
  }, [data?.vocabularies]);

  const nextVocabulary = ({ voiceSrc, index, isUpdate }: { voiceSrc: string; index: number; isUpdate: boolean }) => {
    if (vocabularies[index]) {
      const newArr = [...renderVocabulary];
      newArr[index] = {
        ...newArr[index],
        voiceSrc,
      };

      if(!isUpdate && index >= vocabularies.length - 1 && !isFinish) {
        setIsFinish(true);
      }
      if(!isUpdate && index < vocabularies.length - 1) {
        newArr.push(vocabularies[index + 1]);
      }
      setRenderVocabulary(newArr);

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
    if (renderVocabulary.length > 0 && parentRef.current&&enrollmentData.stage !== StageExercise.Close) {
      scrollToLastElement();
    }
  });

  useEffect(()=>{
    if (data?.stage === StageExercise.Close) {
      setIsFinish(true);
    } else {
      setIsFinish(false);
    }
  }, [data?.stage])

  const redirectSentenceList = () => {
    navigate(
      {
        pathname: ROUTER.RECORD_LIST,
      },
      {
        state: {
          lectureId,
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <Box className='flex flex-col grow bg-gray-100 min-h-screen'>
      <Container className='py-4 divider bg-gray-100 sticky top-0 z-10'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold grow'>{lectureName}</Typography>
          <IconButton onClick={redirectSentenceList}>
            <Avatar src={MenuIcon} className='w-6 h-6' />
          </IconButton>
        </Box>
      </Container>
      
      <Box ref={parentRef} className='text-center grow bg-gray-100'>
        {renderVocabulary.map((val: VocabularyTypeWithNativeLanguageResponse, index: number) => (
          <TranslationCard
            {...val}
            key={val.vocabularyId}
            nextVocabulary={nextVocabulary}
            enrollmentId={enrollmentData!.enrollmentId}
            index={index}
            totalVoca={vocabularies.length}
          />
        ))}
        {isFinish && 
          <Box className='bg-gray-100 flex flex-col items-center justify-center h-[500px] p-6 gap-2' key={myInfo}>
            <Avatar src={Congratulation} className='w-16 h-16 mb-4'></Avatar>
            <Typography className='text-extra-large-semibold'>Nice job, {myInfo}</Typography>
            <Typography variant={"body2"} className='mb-4'>
              You finally recorded all the lectures
            </Typography>
            <Button onClick={() => navigate(ROUTER.RECORD)} variant='outlined'>
              Finished
            </Button>
          </Box>
        }
      </Box>
    </Box>
  );
}
