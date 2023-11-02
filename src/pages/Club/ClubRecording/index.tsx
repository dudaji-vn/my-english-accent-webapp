import BoxCard from "@/components/BoxCard";
import ROUTER from "@/shared/const/router.const";
import { Box, Container, IconButton, Avatar, Typography, Grid, Divider, Modal, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import CloseIcon from "@/assets/icon/close-icon.svg";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";
import { useGetChallengeDetailInClubQuery } from "@/core/services/challenge.service";
import ClubRecordingAudio from "@/components/ClubRecordPlayer";
import useTextToSpeech from "@/shared/hook/useTextToSpeech";
import TextToSpeech from "@/shared/hook/useTextToSpeech";
import persist from "@/shared/utils/persist.util";

export default function ClubRecordingPage() {
  const navigate = useNavigate();
  const { state, hash } = useLocation();
  const currentStep = parseInt(hash.replace("#", ""));
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const myId = persist.getMyInfo().userId;
  const { data } = useGetChallengeDetailInClubQuery(state.challengeId);

  const vocabuaries = useMemo(() => {
    if (data && data.vocabularies) {
      return data.vocabularies;
    }
    return [];
  }, [data?.vocabularies]);
  const isRerecord = useMemo(() => {
    if (data && data.participants) {
      return !!data.participants.find((user) => user.id === myId);
    }
  }, [data?.participants]);

  const onHandleClose = () => {
    if (currentStep < vocabuaries.length) {
      handleOpen();
    }
  };

  const openModal = () => {
    return (
      <Modal open={open} onClose={handleClose} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 320,
            height: 200,
            background: "#FFF",
            borderRadius: 8,
            p: 2,
            textAlign: "center",
            gap: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography id='modal-modal-title' className='text-large-semibold'>
            Are you sure you want to quit ?
          </Typography>
          <Typography id='modal-modal-description' className='text-base-regular' variant='body2'>
            All progress will be lost
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
            <Button sx={{ flexGrow: 1 }} onClick={handleClose}>
              Stay
            </Button>
            <Button sx={{ flexGrow: 1 }} variant='contained' color='error' onClick={() => navigate(ROUTER.CLUB_DETAIL + ROUTER.CLUB_STUDY + "/" + state.clubId)}>
              Quit
            </Button>
          </Box>
        </Box>
      </Modal>
    );
  };

  //re-recording
  useEffect(() => {
    if (isRerecord) {
      navigate(
        {
          pathname: ROUTER.CLUB_RECORDING_SUMMARY,
        },
        {
          state: {
            clubId: data!.clubId.id,
            challengeId: data!.challengeId,
          },
        }
      );
    }
  }, [isRerecord]);

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Box className='flex flex-col'>
            <Typography className='text-large-semibold'>{data?.challengeName}</Typography>
            <Typography className='text-small-regular' variant='body2'>
              {currentStep + 1}/{vocabuaries.length} sentences
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container id='translationCard' className='py-4 bg-gray-100 flex flex-col grow justify-between'>
        <BoxCard classes='p-4'>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className='text-small-medium'>{vocabuaries[currentStep]?.vtitleDisplayLanguage}</Typography>
            </Grid>
            <Grid item xs={12} className='py-4'>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextToSpeech text={vocabuaries[currentStep]?.vtitleDisplayLanguage} />
            </Grid>
          </Grid>
        </BoxCard>
        {data && <ClubRecordingAudio {...data} />}
      </Container>
      {openModal()}
    </Box>
  );
}
