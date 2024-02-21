import { Box, Button, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box className="m-4 bg-white rounded-2xl shadow-md">
      <Box className="p-4">
        <Typography>Practice speaking</Typography>
        <Typography>
          Complete a lecture to practice your English speaking skills and compete against other TechTalkers in Leaderboards.
        </Typography>
        <Button className="bg-[#E8DEF8] shadow-sm text-textPrimary">Start a lecture</Button>
      </Box>
      <Box className="p-4">
        <Typography>Build vocabulary</Typography>
        <Typography>Practice words and sentences where you have spoken incorrectly during the lectures</Typography>
        <Box className="flex items-center">
          <Button className="bg-[#E8DEF8] shadow-sm text-textPrimary">Start now</Button>
          <Typography>0</Typography>
          <Typography>incorrect words and sentences</Typography>
        </Box>
      </Box>
      <Box className="p-4">
        <Typography>TechTalk Certificates</Typography>
        <Typography>Gain credibility and show off your English speaking skills through a test.</Typography>
        <Box className="flex items-center">
          <Button className="bg-[#E8DEF8] shadow-sm text-textPrimary">Start a certificate</Button>
          <Typography>0/2</Typography>
          <Typography>TechTalk certificates</Typography>
        </Box>
      </Box>
    </Box>
  );
}
