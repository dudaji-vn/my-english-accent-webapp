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
import { resetVocabularyIndex } from "@/store/ExerciseStore";

export default function RecordSummaryPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataVoca = useAppSelector((state) => state.exercise.vocabularies);
  const { refetch } = useGetTopicsQuery();

  const renderWordFinished = () => {
    return dataVoca.map((word) => (
      <WordTag
        key={nanoid()}
        sentence={word.titleNativeLanguage}
        ipa={word.ipaDisplayLanguage}
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

  return (
    <Box>
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={onHandleContinue}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">Finished</Typography>
        </Box>
      </Container>

      <Container className="py-4 bg-gray-100 flex flex-col grow justify-between">
        <Box className="flex flex-col justify-center items-center p-4 bg-white border rounded-t-lg">
          <Typography component={"h6"}>{dataVoca.length}</Typography>
          <Typography variant="body2" className="text-base-regular">
            Phrases practiced
          </Typography>
        </Box>
        {renderWordFinished()}
      </Container>

      {/* pesudo tag */}
      <Box className="p-6 invisible">
        <Button>pesudo tag</Button>
      </Box>
      <Box className="flex fixed bottom-0 w-full p-6 bg-white border-solid border-stroke border-0 border-t-[1px]">
        <Button
          variant="contained"
          className="rounded-md m-auto"
          onClick={onHandleContinue}
        >
          <Typography className="text-base-medium" color={"white"}>
            Continue practice
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
