import { Grid, Typography } from "@mui/material";
import VolumnIcon from "@/assets/icon/volume-icon.svg";
import AudioPlayer from "../AudioPlayer";

interface WordTagPropType {
  sentence: string;
  ipa: string;
  classes: string;
  voiceSrc: string;
}
export default function WordTag({
  sentence,
  ipa,
  classes,
  voiceSrc,
}: WordTagPropType) {
  return (
    <Grid container gap={1} className={`p-4 bg-white ${classes}`}>
      <Grid item xs={1}>
        <AudioPlayer voiceSrc={voiceSrc} icon={VolumnIcon} />
      </Grid>
      <Grid item xs={10}>
        <Typography className="text-small-medium">{sentence}</Typography>
      </Grid>
      <Grid item xs={1} className="invisible">
        {/* pesudo tag */}
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body2" className="text-small-regular">
          {ipa}
        </Typography>
      </Grid>
    </Grid>
  );
}
