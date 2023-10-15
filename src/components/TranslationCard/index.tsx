import BoxCard from "@/components/BoxCard";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import SpeakingIcon from "@/assets/icon/speaking-icon.svg";
import Vietnamflag from "@/assets/icon/vietnam-flag-icon.svg";
import RecordingAudio from "@/components/RecordingAudio";

export default function TranslationCard(props: any) {
  const audio = new Audio(props.vocabularyVoiceSrc);
  const onRepeat = () => {
    audio.play();
  };
  return (
    <Container
      id="translationCard"
      className="py-4 bg-gray-100 flex flex-col grow justify-between"
    >
      <Box>
        <BoxCard classes="p-4">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography className="text-small-medium">
                {props.vocabularytitleNativeLanguage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="text-small-regular">
                {props.vocabularyIpaDisplayLanguage}
              </Typography>
            </Grid>
            <Grid item xs={12} className="py-4">
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <IconButton onClick={onRepeat}>
                <Avatar
                  src={SpeakingIcon}
                  alt="speaking-icon"
                  className="w-10 h-10"
                />
              </IconButton>
            </Grid>
          </Grid>
        </BoxCard>

        <Box className="flex gap-1 mt-4">
          <Avatar
            alt="national-flag-icon"
            src={Vietnamflag}
            className="w-4 h-4 mt-1"
          />
          <Typography variant="body2" className="text-small-regular">
            {props.vocabularyTitleDisplayLanguage}
          </Typography>
        </Box>
      </Box>
      <RecordingAudio
        vocabularyId={props.vocabularyId}
        topicId={props.topicId}
      />
    </Container>
  );
}
