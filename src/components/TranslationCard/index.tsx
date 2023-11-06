import BoxCard from "@/components/BoxCard";
import { Avatar, Box, Container, Divider, Grid, IconButton, Typography } from "@mui/material";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import RecordingAudio from "@/components/RecordingAudio";
import { VocabularyTypeResponse, EnrollmentResponseType, NativeVocabularyTypeResponse } from "@/core/type";
import TextToSpeech from "@/shared/hook/useTextToSpeech";
import SoundIcon from "@/assets/icon/sound-icon.svg";

export default function TranslationCard(props: VocabularyTypeResponse & EnrollmentResponseType & NativeVocabularyTypeResponse & { totalStep: number }) {
  const { enrollmentId, vocabularyId, currentStep, totalStep } = props;
  return (
    <Container id='translationCard' className='py-4 bg-gray-100 flex flex-col grow justify-between'>
      <BoxCard classes='p-4'>
        <Grid container spacing={2} textAlign={"center"}>
          <Grid item xs={12}>
            <Typography className='text-small-medium'>{"Push commits to a repository"}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' className='text-small-regular'>
              {"/pʊʃ kəˈmɪts tuː ə rɪˈpɒzɪtᵊri/"}
              <TextToSpeech text={props.vtitleDisplayLanguage} />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <IconButton className='bg-primary p-5 w-12 h-12'>
              <Avatar src={SoundIcon} className='w-6 h-6' />
            </IconButton>
          </Grid>
          <Grid item xs={12} className='py-4'>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant='body2' className='text-small-regular'>
              {"props.titleNativeLanguage"}
            </Typography>
          </Grid>
        </Grid>
      </BoxCard>
    </Container>
  );
}
