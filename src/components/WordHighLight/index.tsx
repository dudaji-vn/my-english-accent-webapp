import { Typography } from "@mui/material";
import { memo } from "react";

function WordHighlight({ sentence = "", transcript = "" }: { sentence: string; transcript: string }) {
  return <Typography className={`mb-6 break-words text-large-medium`}>{sentence}</Typography>;
}

export default memo(WordHighlight);
