import BoxCard from "@/components/Card";
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
import { TopicUIType, VocabularyType } from "@/shared/type";

export default function TranslationCard(
  props: Omit<TopicUIType, "imgSrc"> & VocabularyType
) {
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
                {props.titleNativeLanguage}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" className="text-small-regular">
                {props.ipaDisplayLanguage}
              </Typography>
            </Grid>
            <Grid item xs={12} className="py-4">
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <IconButton className="p-0">
                <Avatar
                  alt="message-icon"
                  src={SpeakingIcon}
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
            {(props as any).titleDisplayLanguluage}
          </Typography>
        </Box>
      </Box>
      <RecordingAudio stage={props.stage} />
    </Container>
  );
}
