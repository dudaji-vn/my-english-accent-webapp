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
import RecordingBtn from "../RecordingBtn";

export default function TranslationCard() {
  return (
    <Container className="py-4 bg-gray-100 flex flex-col grow justify-between">
      <Box>
        <BoxCard>
          <Container className="py-4 h-[169px]">
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography className="text-small-medium">
                  Please unshare your screen, I will share my screen.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" className="text-small-regular">
                  /pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/
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
          </Container>
        </BoxCard>

        <Box className="flex gap-1 mt-4">
          <Avatar
            alt="national-flag-icon"
            src={Vietnamflag}
            className="w-4 h-4 mt-1"
          />
          <Typography variant="body2" className="text-small-regular">
            Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của
            tôi.
          </Typography>
        </Box>
      </Box>
      <RecordingBtn />
    </Container>
  );
}
