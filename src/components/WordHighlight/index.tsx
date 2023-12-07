import { similarityScore } from "@/shared/utils/similarity.util";
import { Typography } from "@mui/material";
import { memo, useCallback } from "react";

function WordHighlight({ sentence = "", transcript = "" }: { sentence: string; transcript: string }) {
  const renderWords = useCallback(() => {
    const splitTranscript = transcript.split(" ");
    const splitSentence = sentence.split(" ");

    return splitSentence.map((word, index) => {
      return (
        <span className={`mr-1 last:mr-0 inline-block ${similarityScore(word, splitTranscript[index]) > 0.5 ? "text-secondary" : ""}`} key={word + index}>
          {word}
        </span>
      );
    });
  }, [transcript]);

  return <Typography className={`mb-6 break-words text-large-medium`}>{renderWords()}</Typography>;
}

export default memo(WordHighlight);
