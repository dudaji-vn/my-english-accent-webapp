import { removeSpecialCharacters } from "@/shared/utils/string.util";

const VoiceApiController = {
  textToSpeech: (text: string) => {
    return {
      url: `/google/textToSpeak?query=${removeSpecialCharacters(text)}`,
    };
  },
};

export default VoiceApiController;
