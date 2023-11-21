import CloseIcon from "@/assets/icon/close-icon.svg";
import { Avatar, Box, Button, Container, IconButton, Step, StepLabel, Stepper, Typography } from "@mui/material";

import FooterCard from "@/components/FooterBtn";
import LecturePlaylist from "@/components/LecturePlaylist";
import UserPlaylist from "@/components/UserPlaylist";
import { pluralize } from "@/shared/utils/pluralize.util";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateOrUpdatePlaylistMutation, useGetPlaylistSummaryQuery } from "@/core/services/listen.service";
import ROUTER from "@/shared/const/router.const";

const steps = ["Select lectures", "Select people"];

export default function CreatePlaylist() {
  const navigate = useNavigate();
  const { refetch } = useGetPlaylistSummaryQuery();

  const [updatePlaylist] = useCreateOrUpdatePlaylistMutation();

  const [activeStep, setActiveStep] = React.useState(0);
  const [lectureList, setLectureList] = useState<string[]>([]);
  const [peopleList, setPeopleList] = useState<string[]>([]);

  const disableBtn = useMemo(() => {
    switch (activeStep) {
      case 0:
        return !lectureList.length;
      case 1:
        return !peopleList.length;
    }
  }, [activeStep, lectureList, peopleList]);

  const handleNext = async () => {
    const responseUpdate = await updatePlaylist({
      favoriteLectureIds: lectureList,
      favoriteUserIds: peopleList,
    }).unwrap();

    if (responseUpdate && activeStep === 0) {
      setActiveStep((preVal) => preVal + 1);
    } else if (responseUpdate && activeStep === 1) {
      refetch();
      navigate(ROUTER.LISTENING);
    }
  };

  const stepperComponent = (index: number) => {
    const activeClass = activeStep + 1 === index;
    return (
      <Box className={`border-purple-200 rounded-full border border-solid p-2 h-8 w-8 flex items-center justify-center text-small-semibold ${activeClass ? "bg-purple-200" : ""}`}>
        {index}
      </Box>
    );
  };

  const renderList = () => {
    switch (activeStep) {
      case 0:
        return <LecturePlaylist lectureList={lectureList} setLectureList={(val: string[]) => setLectureList(() => val)} />;
      case 1:
        return <UserPlaylist peopleList={peopleList} setPeopleList={(val: string[]) => setPeopleList(() => val)} />;
    }
  };

  const renderFooterTitle = () => {
    switch (activeStep) {
      case 0:
        return pluralize(lectureList.length, "lecture") + " selected";
      case 1:
        return pluralize(peopleList.length, "people", "") + " selected";
    }
  };

  return (
    <Box className='flex flex-col grow min-h-screen'>
      <Container className='py-4 divider '>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={() => navigate(-1)}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>Create playlist</Typography>
        </Box>
      </Container>

      <Box className='p-4'>
        <Stepper>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel StepIconComponent={() => stepperComponent(index + 1)}>
                  <Typography className='text-small-semibold'>{label}</Typography>
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>

      <Box className='flex flex-col p-4 grow  bg-gray-100 gap-4'>{renderList()}</Box>

      <FooterCard classes='items-center justify-between'>
        <Typography variant='body2'>{renderFooterTitle()}</Typography>
        <Button variant='contained' className='rounded-md' onClick={handleNext} disabled={disableBtn}>
          <Typography className='text-base-medium text-white'>{activeStep === 1 ? "Done" : "Next"}</Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
