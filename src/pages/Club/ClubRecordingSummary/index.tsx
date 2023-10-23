import { Container, Box, IconButton, Avatar, Typography, Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import WordTag from "@/components/WordTag";
import ROUTER from "@/shared/const/router.const";
import FooterBtn from "@/components/FooterBtn";
import persist from "@/shared/utils/persist.util";
import { useGetAllRecordsOfVocabularyQuery } from "@/core/services/recordProgress.service";
import { RecordTypeResponse, VocabularyTypeResponse } from "@/core/type";
import { useGetAllRecordInChallengeQuery } from "@/core/services/challenge.service";

export default function ClubRecordingSummaryPage() {
  const navigate = useNavigate();
  const myId = persist.getMyInfo().userId;

  const { state } = useLocation();
  const { data } = useGetAllRecordInChallengeQuery(state.challengeId);
  console.log(data);
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
    navigate({
      pathname: ROUTER.CLUB_DETAIL + "/" + ROUTER.CLUB_STUDY + "/" + state.clubId,
    });
  };

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Typography className='text-large-semibold'>Finished</Typography>
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
