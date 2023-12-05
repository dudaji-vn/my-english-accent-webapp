import CloseIcon from "@/assets/icon/close-icon.svg";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import BoxCard from "@/components/BoxCard";
import ClubRecordingAudio from "@/components/ClubRecordPlayer";
import Loading from "@/components/Loading";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useGetVocabularyQuery } from "@/core/services";
import { useAddOrUpdateRecordMutation } from "@/core/services/record.service";
import ROUTER from "@/shared/const/router.const";
import TextToSpeech from "@/shared/hook/useTextToSpeech";
import persist from "@/shared/utils/persist.util";
import { Avatar, Box, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function RerecordingProgressPage() {
  //TODO speaking audio
  const myId = persist.getMyInfo().userId;

  const navigate = useNavigate();
  const search = useLocation();
  const titleName = decodeURI(search.pathname).replace("/rerecord/", "");
  const { vocabularyId } = search.state;
  const { challengeId } = search.state;
  const { clubId } = search.state;

  const [updateRecord] = useAddOrUpdateRecordMutation();
  const { data, isFetching } = useGetVocabularyQuery(vocabularyId);

  const onHandleClose = () => {
    navigate(-1);
  };

  const onHandleNext = async (mediaFile: File) => {
    if (data && mediaFile) {
      const url = await UploadFileController.uploadAudio(mediaFile, data.vocabularyId, myId, true);

      await updateRecord({
        vocabularyId: data.vocabularyId,
        challengeId,
        voiceSrc: url,
      });
    }

    navigate(
      {
        pathname: ROUTER.CLUB_RECORDING_SUMMARY,
      },
      {
        state: {
          clubId: clubId,
          challengeId: challengeId,
        },
      }
    );
  };

  if (isFetching) return <Loading />;

  return (
    <Box className='flex flex-col grow min-h-screen'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleClose}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>{titleName}</Typography>
        </Box>
      </Container>
      {data && (
        <Container id='translationCard' className='py-4 bg-gray-100 flex flex-col grow justify-between'>
          <Box>
            <BoxCard classes='p-4'>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography className='text-small-medium'>{data.vtitleDisplayLanguage}</Typography>
                </Grid>
                <Grid item xs={12} className='py-4'>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' className='text-small-regular break-keep' component={"div"}>
                    {data.vphoneticDisplayLanguage}
                    {/* <TextToSpeech text={data.vtitleDisplayLanguage} /> */}
                  </Typography>
                </Grid>
              </Grid>
            </BoxCard>

            <Box className='flex gap-1 mt-4'>
              <Typography variant='body2' className='text-small-regular'>
                {data.titleNativeLanguage}
              </Typography>
            </Box>
          </Box>
          <ClubRecordingAudio onHandleNext={onHandleNext} />

          {/* <Box className='text-center'>
            <Box className='flex items-center p-7 justify-between'>
              <IconButton onClick={onRepeat} className='border border-stroke border-solid' disabled={playing}>
                <Avatar src={HearingIcon} className='w-6 h-6' />
              </IconButton>

              <Box>
                <IconButton className='bg-primary p-5' onClick={onHandlePlay}>
                  <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
                </IconButton>
              </Box>
              <IconButton onClick={() => onHandleNext()} className='border border-stroke border-solid'>
                <Avatar src={ArrowRight} className='w-6 h-6' />
              </IconButton>
            </Box>
            <Typography variant='body2' className='text-small-regular mt-4'>
              {isRecord ? "Speak now" : "Tap the icon above and record your voice"}
            </Typography>
          </Box> */}
        </Container>
      )}
    </Box>
  );
}
