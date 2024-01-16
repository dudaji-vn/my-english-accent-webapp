import { Typography } from "@mui/material";
import { memo, useMemo } from "react";
import { EMPTY_TRANSCRIPT } from "@/core/type";
import { removeSpecialCharacters } from "../../shared/utils/string.util";

function WordHighlight({ sentence = "", transcript = "" }: { sentence: string; transcript: string }) {
  const isHighLight = useMemo(() => {
    return removeSpecialCharacters(sentence).toLowerCase() === removeSpecialCharacters(transcript).toLowerCase();
  }, [sentence, transcript]);

  return (
    <div>
      {transcript === EMPTY_TRANSCRIPT ? (
        <Typography className={`mb-6 break-words text-base text-gray-400`}>Sorry, we couldn't hear you.</Typography>
      ) : (
        <Typography className={`mb-6 break-words text-base ${isHighLight ? "text-secondary" : "text-red-400"}`}>
          {isHighLight ? sentence : transcript}
        </Typography>
      )}
    </div>
  );
}

export default memo(WordHighlight);
