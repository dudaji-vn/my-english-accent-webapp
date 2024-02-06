import { Container, Box, IconButton, Avatar, Typography, Button, CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import ROUTER from "@/shared/const/router.const";
import FooterBtn from "@/components/footer-btn";
import { AudioRecord } from "@/components/audio-record";
import { useGetMyRecordsByLectureQuery } from "@/core/services/record.service";

export default function RecordSummaryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const { data, isFetching } = useGetMyRecordsByLectureQuery(state.lectureId);

  const onHandleContinue = () => {
    navigate(ROUTER.RECORD);
  };

  if (isFetching)
    return (
      <Box className="m-auto">
        <CircularProgress />
      </Box>
    );

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
          <Typography component={"h6"}>{data && data.vocabularies.length}</Typography>
          <Typography variant="body2" className="text-base-regular">
            Sentences practiced
          </Typography>
        </Box>
        {data && <AudioRecord {...data} />}
      </Container>

      <FooterBtn>
        <Button variant="contained" className="rounded-md m-auto" onClick={onHandleContinue}>
          <Typography className="text-base-medium" color={"white"}>
            Continue practice
          </Typography>
        </Button>
      </FooterBtn>
    </Box>
  );
}
