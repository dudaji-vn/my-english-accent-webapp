import { Container, Box, IconButton, Avatar, Typography, Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import ROUTER from "@/shared/const/router.const";
import FooterBtn from "@/components/FooterBtn";
import persist from "@/shared/utils/persist.util";
import { useGetAllRecordsOfVocabularyQuery } from "@/core/services/recordProgress.service";
import { AudioRecord } from "@/components/AudioRecord";

export default function RecordSummaryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const myId = persist.getMyInfo().userId;
  const { data } = useGetAllRecordsOfVocabularyQuery({ myId, lectureId: state.lectureId });
  console.log("data::",data)
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
          <Typography component={"h6"}>{data && data.vocabularies.length}</Typography>
          <Typography variant='body2' className='text-base-regular'>
            Sentences practiced
          </Typography>
        </Box>
        {data && <AudioRecord {...data} />}
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
