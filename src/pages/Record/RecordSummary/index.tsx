import {
  Container,
  Box,
  IconButton,
  Avatar,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import WordTag from "@/components/WordTag";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import ROUTER from "@/shared/const/router.const";
import { useGetTopicsQuery } from "@/core/services";
import { resetVocabularyIndex } from "@/store/RecordPageStore";
import FooterBtn from "@/components/FooterBtn";
import { useEffect } from "react";
import { StageExercise } from "@/shared/type";

export default function RecordSummaryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataVoca = useAppSelector((state) => state.recordPage.vocabularies);
  const topicFilterStore = useAppSelector((state) => state.recordPage.filter);
  const { refetch } = useGetTopicsQuery();

  const renderWordFinished = () => {
    return dataVoca.map((word: any) => (
      <WordTag
        key={nanoid()}
        sentence={word.vocabularyTitleDisplayLanguage}
        ipa={word.vocabularyIpaDisplayLanguage}
        voiceSrc={word.voiceRecordSrc}
        classes="divider last:rounded-b-lg"
      />
    ));
  };

  const onHandleContinue = () => {
    navigate(ROUTER.RECORD);
    dispatch(resetVocabularyIndex());
    refetch();
  };

  useEffect(() => {
    if (topicFilterStore.stage !== StageExercise.Close) {
      navigate({
        pathname: ROUTER.RECORD,
      });
    }
  }, [topicFilterStore.stage]);

  return (
    <Box className="flex flex-col grow">
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={onHandleContinue}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">Finished</Typography>
        </Box>
      </Container>

      <Container className="py-4 bg-gray-100 flex flex-col grow ">
        <Box className="flex flex-col justify-center items-center p-4 bg-white border rounded-t-lg">
          <Typography component={"h6"}>{dataVoca.length}</Typography>
          <Typography variant="body2" className="text-base-regular">
            Phrases practiced
          </Typography>
        </Box>
        {renderWordFinished()}
      </Container>

      <FooterBtn>
        <Button
          variant="contained"
          className="rounded-md m-auto"
          onClick={onHandleContinue}
        >
          <Typography className="text-base-medium" color={"white"}>
            Continue practice
          </Typography>
        </Button>
      </FooterBtn>
    </Box>
  );
}
