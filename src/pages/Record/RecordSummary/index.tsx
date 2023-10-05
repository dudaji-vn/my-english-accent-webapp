import TranslationCard from "@/components/TranslationCard";
import {
  Container,
  Box,
  IconButton,
  Avatar,
  Typography,
  LinearProgress,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import WordTag from "@/components/WordTag";

export default function RecordSummaryPage() {
  const goBack = useNavigate();
  return (
    <Box>
      <Container className="py-4 border-solid border-stroke border-0 border-b-[1px] bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => goBack(-1)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">Finished</Typography>
        </Box>
      </Container>

      <Container className="py-4 bg-gray-100 flex flex-col grow justify-between">
        <Box className="flex flex-col justify-center items-center p-4 bg-white">
          <Typography component={"h6"}>5</Typography>
          <Typography variant="body2" className="text-base-regular">
            Phrases practiced
          </Typography>
        </Box>
        <WordTag />
        <WordTag />
        <WordTag />
        <WordTag />
        <WordTag />
      </Container>
    </Box>
  );
}
