import { Container, Box, IconButton, Avatar, Typography, Button, CircularProgress, Modal } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import ROUTER from "@/shared/const/router.const";
import FooterBtn from "@/components/FooterBtn";
import { AudioRecord } from "@/components/AudioRecord";
import { useGetMyRecordsByLectureQuery } from "@/core/services/record.service";

export default function SentenceItem() {
  return (
    <Box className='bg-white'>
      <Typography id='modal-modal-title' variant='h6' component='h2'>
        Text in a modal
      </Typography>
      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  );
}
