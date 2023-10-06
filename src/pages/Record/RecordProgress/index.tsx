import TranslationCard from "@/components/TranslationCard";
import {
  Container,
  Box,
  IconButton,
  Avatar,
  Typography,
  LinearProgress,
} from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";
import { Outlet, useNavigate } from "react-router-dom";

export default function RecordingProgressPage() {
  const goBack = useNavigate();
  return (
    <Box className="flex flex-col grow">
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => goBack(-1)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">Development</Typography>
        </Box>
        <LinearProgress value={50} variant="determinate" />
      </Container>
      <TranslationCard />
    </Box>
  );
}
