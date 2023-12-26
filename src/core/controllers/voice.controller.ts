import {  removeSpecialCharactersExceptWhiteSpace } from "@/shared/utils/string.util";

const VoiceApiController = {
  textToSpeech: (text: string) => {
    return {
      url: `/google/textToSpeak?query=${removeSpecialCharactersExceptWhiteSpace(text)}`,
    };
  },
};

export default VoiceApiController;
