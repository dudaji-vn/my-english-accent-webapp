import BoxCard from "@/components/box-card";
import ROUTER from "@/shared/const/router.const";
import { Avatar, Box, Button, Container, Divider, Grid, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import ClubRecordingAudio from "@/components/club-record-player";
import Loading from "@/components/loading";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useGetChallengeDetailInClubQuery, useUpdateChallengeMemberMutation } from "@/core/services/challenge.service";
import { useAddOrUpdateRecordMutation } from "@/core/services/record.service";
import { RecordRequest } from "@/core/type";
import persist from "@/shared/utils/persist.util";

export default function ClubRecordingPage() {
  const navigate = useNavigate();
  const { state, hash } = useLocation();
  const currentStep = parseInt(hash.replace("#", "")) ?? 0;
  const myId = persist.getMyInfo().userId;
  const [listRecord, setListRecord] = useState<RecordRequest[]>([]);
  const [open, setOpen] = useState(false);

  const { data } = useGetChallengeDetailInClubQuery(state.challengeId);
  const [addRecord] = useAddOrUpdateRecordMutation();
  const [addParticipant] = useUpdateChallengeMemberMutation();

  const vocabularies = useMemo(() => {
    return data ? data.vocabularies : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.vocabularies]);

  const isRerecord = useMemo(() => {
    if (data && data.participants) {
      return !!data.participants.find((user) => user === myId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.participants]);

  const onHandleClose = () => setOpen(false);
  const onHandleBack = () => {
    if (currentStep < vocabularies.length) {
      setOpen(() => true);
    }
  };

  const onHandleNext = async (mediaFile: File) => {
    if (mediaFile) {
      const vocabularyId = vocabularies[currentStep].vocabularyId;
      const url = await UploadFileController.uploadAudio(mediaFile, vocabularyId, myId, true);
      const request = {
        voiceSrc: url,
        vocabularyId: vocabularyId,
        challengeId: state.challengeId,
      };
      setListRecord((preVal) => [...preVal, request]);
      navigate(
        {
          pathname: ROUTER.CLUB_RECORDING,
          hash: `${currentStep + 1}`,
        },
        {
          state: {
            challengeId: state.challengeId,
            clubId: data?.clubId,
          },
        }
      );
    }
  };

  const onSaveRecord = (listRecord: RecordRequest[]) => {
    return Promise.all(listRecord.map((request) => addRecord(request)));
  };

  useEffect(() => {
    if (vocabularies.length) {
      if (!vocabularies[currentStep]) {
        onSaveRecord(listRecord);
        addParticipant(state.challengeId).then(() =>
          navigate(
            {
              pathname: ROUTER.CLUB_RECORDING_SUMMARY,
            },
            {
              state: {
                clubId: data!.clubId,
                challengeId: data!.challengeId,
              },
            }
          )
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listRecord]);

  //re-recording
  useEffect(() => {
    if (isRerecord) {
      navigate(
        {
          pathname: ROUTER.CLUB_RECORDING_SUMMARY,
        },
        {
          state: {
            clubId: data!.clubId,
            challengeId: data!.challengeId,
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRerecord]);

  if (vocabularies.length) {
    if (!vocabularies[currentStep]) {
      return <Loading />;
    }
  }

  return (
    <Box className="flex flex-col grow min-h-screen">
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={onHandleBack}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Box className="flex flex-col">
            <Typography className="text-large-semibold">{data?.challengeName}</Typography>
            <Typography className="text-small-regular" variant="body2">
              {currentStep + 1}/{vocabularies.length} sentences
            </Typography>
          </Box>
        </Box>
      </Container>
      <Container id="translationCard" className="py-4 bg-gray-100 flex flex-col grow justify-between">
        <BoxCard classes="p-4">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className="text-small-medium">{vocabularies[currentStep]?.vtitleDisplayLanguage}</Typography>
            </Grid>
            <Grid item xs={12} className="py-4">
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="text-small-regular break-keep" component={"div"}>
                {vocabularies[currentStep]?.vphoneticDisplayLanguage}
                {/* <TextToSpeech text={vocabularies[currentStep]?.vtitleDisplayLanguage} /> */}
              </Typography>
            </Grid>
          </Grid>
        </BoxCard>
        <ClubRecordingAudio onHandleNext={onHandleNext} />
      </Container>

      <Modal open={open} onClose={onHandleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
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
          <Typography id="modal-modal-title" className="text-large-semibold">
            Are you sure you want to quit ?
          </Typography>
          <Typography id="modal-modal-description" className="text-base-regular" variant="body2">
            All progress will be lost
          </Typography>
          <Box display={"flex"} justifyContent={"space-around"}>
            <Button sx={{ flexGrow: 1 }} onClick={onHandleClose}>
              Stay
            </Button>
            <Button
              sx={{ flexGrow: 1 }}
              variant="contained"
              color="error"
              onClick={() => navigate(ROUTER.CLUB_DETAIL + ROUTER.CLUB_STUDY + "/" + state.clubId)}
            >
              Quit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
