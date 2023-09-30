import React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";

export default function CardRecord() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Box>1</Box>
      </Grid>
      <Grid item xs={4}>
        <Box>2</Box>
      </Grid>
      <Grid item xs={4}>
        <Box>3</Box>
      </Grid>
      <Grid item xs={8}>
        <Box>4</Box>
      </Grid>
    </Grid>
  );
}
