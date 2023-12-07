const GoogleApiController = {
  textToSpeech: (text: string) => {
    return {
      url: `${process.env.REACT_APP_MIDDO_URL}/voices?query=${text}&languageCode=en-US`,
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
          sampleRateHertz: 44100,
          languageCode: "en-US",
        },
      }),
    };
  },
};

export default GoogleApiController;
