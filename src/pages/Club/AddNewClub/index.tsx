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

function LectureCard({ lectureName, lectureId, imgSrc, classes }: { lectureName: string; lectureId: string; imgSrc: string; classes: string }) {
  const [checked, setChecked] = useState(false);

  return (
    <BoxCard classes={classes}>
      <Box className='w-10 h-10'>
        <Avatar variant='square' className='w-full h-full' src={imgSrc}></Avatar>
      </Box>
      <Typography className='grow'> {lectureName}</Typography>
      <Checkbox onClick={() => setChecked(() => !checked)} checked={checked} icon={<img src={UncheckIcon} alt='uncheck-icon' />} checkedIcon={<img src={CheckIcon} alt='check-icon' />} className='' />
    </BoxCard>
  );
}

export default function AddNewClubPage() {
  const navigate = useNavigate();

  const { data } = useGetLecturesQuery();

  console.log(data);

  const [clubName, setClubName] = useState("");
  const [lectureId, setLectureId] = useState("");

  const onCreateNewClub = () => {
    console.log(clubName, lectureId);
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
          {data &&
            data.map((lectue) => (
              <LectureCard
                key={lectue.lectureId}
                lectureName={lectue.lectureName}
                lectureId={lectue.lectureId}
                imgSrc={lectue.imgSrc}
                classes='flex items-center gap-2 p-4 rounded-none divider first:rounded-t-lg last:rounded-b-lg'
              />
            ))}
        </Box>
      </Container>
      <FooterCard classes='items-center'>
        <Button variant='contained' className='rounded-md m-auto' onClick={onCreateNewClub}>
          <Typography className='text-base-medium text-white'>Create new</Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
