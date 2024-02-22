import { Box, Button, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Box className="m-4 bg-white rounded-2xl shadow-md">
      <Box className="p-4">
        <Typography className="text-lg font-semibold mb-2">Practice speaking</Typography>
        <Typography className="mb-6">
          Complete a lecture to practice your English speaking skills and compete against other TechTalkers in Leaderboards.
        </Typography>
        <Button className="bg-[#E8DEF8] shadow-sm text-textPrimary rounded-2xl px-4">Start a lecture</Button>
      </Box>
      <Box className="p-4">
        <Typography className="text-lg font-semibold mb-2">Build vocabulary</Typography>
        <Typography className="mb-6">
          Practice words and sentences where you have spoken incorrectly during the lectures
        </Typography>
        <Box className="flex items-center">
          <Button disabled variant="contained" className="shadow-sm text-textPrimary rounded-2xl px-4">
            Start now
          </Button>
          <Typography>0</Typography>
          <Typography>incorrect words and sentences</Typography>
        </Box>
      </Box>
      <Box className="p-4">
        <Typography className="text-lg font-semibold">TechTalk Certificates</Typography>
        <Typography>Gain credibility and show off your English speaking skills through a test.</Typography>
        <Box className="flex items-center">
          <Button className="bg-[#E8DEF8] shadow-sm text-textPrimary rounded-2xl px-4">Start a certificate</Button>
          <Typography>0/2</Typography>
          <Typography>TechTalk certificates</Typography>
        </Box>
      </Box>
    </Box>
  );
}
