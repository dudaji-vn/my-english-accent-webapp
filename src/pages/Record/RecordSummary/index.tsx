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
import { nanoid } from "@reduxjs/toolkit";

export default function RecordSummaryPage() {
  const goBack = useNavigate();

  const renderWordFinished = () => {
    return [
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
      { sentence: "Phrase practice here", ipa: "/Spelling/" },
    ].map((word) => (
      <WordTag
        key={nanoid()}
        sentence={word.sentence}
        ipa={word.ipa}
        classes="divider last:rounded-b-lg"
      />
    ));
  };
  return (
    <Box>
      <Container className="py-4 divider bg-white">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => goBack(-1)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold">Finished</Typography>
        </Box>
      </Container>

      <Container className="py-4 bg-gray-100 flex flex-col grow justify-between">
        <Box className="flex flex-col justify-center items-center p-4 bg-white border rounded-t-lg">
          <Typography component={"h6"}>5</Typography>
          <Typography variant="body2" className="text-base-regular">
            Phrases practiced
          </Typography>
        </Box>
        {renderWordFinished()}
      </Container>

      <Box className="flex fixed bottom-0 w-full p-6 bg-white border-solid border-stroke border-0 border-t-[1px]">
        <Button variant="contained" className="rounded-md m-auto">
          <Typography className="text-base-medium" color={"white"}>
            Continue practice
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
