import { Box } from "@mui/material";

import { useNavigate } from "react-router-dom";
import WordTag from "@/components/WordTag";
import { nanoid } from "@reduxjs/toolkit";

export default function IndividualPage() {
  const navigate = useNavigate();

  const renderWords = () => {
    return ["", "", ""].map((word) => (
      <WordTag
        key={nanoid()}
        sentence={nanoid()}
        ipa={nanoid()}
        voiceSrc={nanoid()}
        classes="divider last:rounded-b-lg"
      />
    ));
  };
  return <Box className="">{renderWords()}</Box>;
}
