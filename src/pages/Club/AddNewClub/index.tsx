import { ChangeEvent, useState } from "react";
import { Avatar, Box, Button, Checkbox, Container, TextField, Typography } from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";
import WebniarIcon from "@/assets/icon/webinar-icon.svg";

import ROUTER from "@/shared/const/router.const";
import { useNavigate } from "react-router-dom";
import BoxCard from "@/components/BoxCard";
import UncheckIcon from "@/assets/icon/circle-uncheck-icon.svg";
import CheckIcon from "@/assets/icon/circle-check-icon.svg";
import FooterCard from "@/components/FooterBtn";
import { useGetLecturesQuery } from "@/core/services";
import { useSetClubMutation } from "@/core/services/club.service";
import persist from "@/shared/utils/persist.util";
import { nanoid } from "@reduxjs/toolkit";

function LectureCard({ lectureName, lectureId, imgSrc, callback }: { lectureName: string; lectureId: string; imgSrc: string; callback: Function }) {
  const [checked, setChecked] = useState(false);

  const onSelectLecture = () => {
    setChecked(() => !checked);
    callback(lectureId);
  };

  return (
    <Box className='flex items-center gap-2 p-4 bg-white divider' onClick={onSelectLecture}>
      <Box className='w-10 h-10'>
        <Avatar variant='square' className='w-full h-full' src={imgSrc}></Avatar>
      </Box>
      <Typography className='grow'> {lectureName}</Typography>
      <Checkbox
        checked={checked}
        icon={<Avatar variant='square' src={UncheckIcon} alt='uncheck-icon' className='w-4 h-4' />}
        checkedIcon={<Avatar variant='square' src={CheckIcon} alt='check-icon' className='w-4 h-4' />}
      />
    </Box>
  );
}

export default function AddNewClubPage() {
  const navigate = useNavigate();

  const myId = persist.getMyInfo().userId;
  const { data } = useGetLecturesQuery();
  const [addClub] = useSetClubMutation();

  console.log(data);

  const [clubName, setClubName] = useState("");
  const [lecturesId, setLecturesId] = useState<string[]>([]);

  const onSaveLectureId = (param: string) => {
    const isExist = lecturesId.find((id) => id === param);
    if (isExist) {
      const removed = lecturesId.filter((id) => id != param);
      setLecturesId(() => [...removed]);
    } else {
      setLecturesId(() => [...lecturesId, param]);
    }
  };

  const onCreateNewClub = () => {
    const clubId = `clubId_${nanoid()}`;
    addClub({
      clubId,
      clubName,
      lectures: lecturesId,
      ownerUserId: myId,
    });

    navigate(
      {
        pathname: ROUTER.CLUB_ADD_MEMBER,
      },
      { state: { clubId } }
    );
  };

  return (
    <Box className='flex flex-col grow'>
      <Box className='p-4 flex items-center gap-2 bg-white'>
        <Avatar src={CloseIcon} className='w-6 h-6' onClick={() => navigate(ROUTER.CLUB)} />
        <Typography className='text-large-semibold'>Create club</Typography>
      </Box>
      <Container className='mt-6 grow'>
        <Box>
          <Typography className='text-small-medium mb-2' variant='body2'>
            What's your club name
          </Typography>
          <TextField
            placeholder='TechTalk and Design Club'
            variant='outlined'
            value={clubName}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setClubName(event.target.value);
            }}
          />
        </Box>

        <Box className='mt-4'>
          <Typography className='text-small-medium mb-4' variant='body2'>
            Lecture (topic)
          </Typography>
          {data && data.map((lectue) => <LectureCard key={lectue.lectureId} lectureName={lectue.lectureName} imgSrc={lectue.imgSrc} lectureId={lectue.lectureId} callback={onSaveLectureId} />)}
        </Box>
      </Container>
      <FooterCard classes='items-center'>
        <Button variant='contained' className='rounded-md m-auto' onClick={onCreateNewClub} disabled={!clubName || lecturesId.length === 0}>
          <Typography className='text-base-medium text-white'>Create new</Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
