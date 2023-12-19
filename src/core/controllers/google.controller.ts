import { removeSpecialCharacters } from "../../shared/utils/string.util";

const GoogleApiController = {
  textToSpeech: (text: string) => {
    return {
      url: `/google/textToSpeak?query=${removeSpecialCharacters(text)}`,
    };
  },
  speechToText: (dataBase64: string) => {
    return {
      url: `${process.env.REACT_APP_GOOGLE_SPEECH_URL}?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audio: {
          content: dataBase64,
        },
        config: {
          encoding: "MP3",
          sampleRateHertz: 20000,
          languageCode: "en-UK",
          speechContexts: {
            phrases: ["He promised to visit HoChiMin office before he leaves for Seoul."],
          },
        },
      }),
    };
  },
};

export default GoogleApiController;
