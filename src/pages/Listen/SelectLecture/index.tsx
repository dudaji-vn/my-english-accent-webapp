import CloseIcon from "@/assets/icon/close-icon.svg";
import { Avatar, Box, Container, IconButton, Radio, Typography } from "@mui/material";

import CheckIcon from "@/assets/icon/check-icon.svg";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateLectureIdListenPage } from "@/core/store/index";
import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";

export default function SelectLecture() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lectureId = useAppSelector((state) => state.GlobalStore.listenPage.lectureId);
  const lectures = useAppSelector((state) => state.GlobalStore.listenPage.lectures);

  const onSelectLecture = (value: string) => {
    dispatch(updateLectureIdListenPage(value));
    navigate(ROUTER.LISTENING);
  };

  const renderLectureList = () => {
    if (!lectures.length) return null;

    return lectures.map((lecture) => {
      return (
        <Container className={`p-4 bg-white divider last:rounded-b-lg flex items-center`} key={lecture.lectureId} onClick={() => onSelectLecture(lecture.lectureId)}>
          <Typography className='text-base-medium grow' onClick={() => {}}>
            {lecture.lectureName}
          </Typography>
          <Radio checked={lectureId === lecture.lectureId} value={lecture.lectureId} icon={<></>} checkedIcon={<Avatar src={CheckIcon} className='w-5 h-5' />} />
        </Container>
      );
    });
  };

  return (
    <Box className='flex flex-col grow min-h-screen'>
      <Box className='p-4 divider sticky bg-white z-10 top-0'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={() => navigate(ROUTER.LISTENING)}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>Select lecture</Typography>
        </Box>
      </Box>

      <Box className='p-4 bg-gray-100 flex flex-col grow'>{renderLectureList()}</Box>
    </Box>
  );
}
