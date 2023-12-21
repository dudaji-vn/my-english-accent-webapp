const GoogleApiController = {
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
          sampleRateHertz: 30000,
          languageCode: "en-us",
          alternativeLanguageCodes: ["en-GB", "en-CA", "en-HK", "en-IN", "en-NZ"],
        },
      }),
    };
  },
};

export default GoogleApiController;
