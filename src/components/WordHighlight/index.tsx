import { TECHTALK_DEFINE } from "@/config/globalDefine";
import { similarityScore } from "@/shared/utils/similarity.util";
import { Typography } from "@mui/material";
import { memo, useCallback } from "react";

function WordHighlight({ sentence = "", transcript = "" }: { sentence: string; transcript: string }) {
  const patternRegex = /[&\/\\#,+()$~%.'":*?<>{}]/;
  const splitSentence = sentence.split(" ");

  const renderWords = useCallback(() => {
    const splitTranscript = transcript.split(" ");
    return splitSentence.map((word, keyIndex) => {
      const removeSpecialCharactersInWord = word.replace(new RegExp(patternRegex, "g"), "").toLowerCase();
      const index = splitTranscript.findIndex((transcript) => transcript == removeSpecialCharactersInWord);
      let tmpTranscript = "";
      if (index != -1) {
        tmpTranscript = splitTranscript[index];
        splitTranscript.splice(index, 1);
      }

      return (
        <span
          className={`mr-1 last:mr-0 inline-block ${similarityScore(removeSpecialCharactersInWord, tmpTranscript) >= TECHTALK_DEFINE.SIMILAR_PASS ? "text-secondary" : ""}`}
          key={keyIndex}
        >
          {word}
        </span>
      );
    });
  }, [transcript]);

  return <Typography className={`mb-6 break-words text-large-medium`}>{renderWords()}</Typography>;
}

export default memo(WordHighlight);
