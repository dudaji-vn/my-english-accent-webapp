import { Grid, Avatar, Typography } from "@mui/material";
import VolumnIcon from "@/assets/icon/volume-icon.svg";

interface WordTagPropType {
  sentence: string;
  ipa: string;
  classes: string;
}
export default function WordTag({ sentence, ipa, classes }: WordTagPropType) {
  return (
    <Grid container gap={1} className={`p-4 bg-white ${classes}`}>
      <Grid item xs={1}>
        <Avatar src={VolumnIcon} alt="volumn-icon" className="w-5 h-5" />
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
