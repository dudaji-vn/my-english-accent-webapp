import { Container, Box, IconButton, Avatar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import WordTag from "@/components/WordTag";
import ROUTER from "@/shared/const/router.const";
import FooterBtn from "@/components/FooterBtn";
import persist from "@/shared/utils/persist.util";
import { useGetAllRecordsOfVocabularyQuery } from "@/core/services/recordProgress.service";
import { RecordTypeResponse, VocabularyTypeResponse } from "@/core/type";

export default function RecordSummaryPage() {
  const navigate = useNavigate();
  const myId = persist.getMyInfo().userId;
  const { data } = useGetAllRecordsOfVocabularyQuery(myId);

  const renderWordFinished = () => {
    if (data) {
      return data.map((word: RecordTypeResponse & VocabularyTypeResponse) => (
        <WordTag
          key={word.recordId}
          sentence={word.vtitleDisplayLanguage}
          phonetic={word.vphoneticDisplayLanguage}
          voiceSrc={word.rVoiceSrc}
          lectureId={(word as any).lectureId}
          lectureName={(word as any).lectureName}
          vocabularyId={word.vocabularyId}
          recordId={word.recordId}
          classes='divider last:rounded-b-lg'
        />
      ));
    }
    return <></>;
  };

  const onHandleContinue = () => {
    navigate(ROUTER.RECORD);
  };

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleContinue}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>Finished</Typography>
        </Box>
      </Container>

      <Container className='py-4 bg-gray-100 flex flex-col grow '>
        <Box className='flex flex-col justify-center items-center p-4 bg-white border rounded-t-lg'>
          <Typography component={"h6"}>{data && data.length}</Typography>
          <Typography variant='body2' className='text-base-regular'>
            Sentences practiced
          </Typography>
        </Box>
        {renderWordFinished()}
      </Container>

      <FooterBtn>
        <Button variant='contained' className='rounded-md m-auto' onClick={onHandleContinue}>
          <Typography className='text-base-medium' color={"white"}>
            Continue practice
          </Typography>
        </Button>
      </FooterBtn>
    </Box>
  );
}
