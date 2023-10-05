import { Grid, Avatar, Typography } from "@mui/material";
import VolumnIcon from "@/assets/icon/volume-icon.svg";

export default function WordTag() {
  return (
    <Grid container gap={1} className="p-4 bg-white">
      <Grid item xs={1}>
        <Avatar src={VolumnIcon} alt="volumn-icon" className="w-5 h-5" />
      </Grid>
      <Grid item xs={10}>
        <Typography className="text-small-medium">
          Phrase practice here
        </Typography>
      </Grid>
      <Grid xs={1} className="invisible">
        {/* pesudo tag */}
      </Grid>
      <Grid item xs={10}>
        <Typography variant="body2" className="text-small-regular">
          /Spelling/
        </Typography>
      </Grid>
    </Grid>
  );
}
