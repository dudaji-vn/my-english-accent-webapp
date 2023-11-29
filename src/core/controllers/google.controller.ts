
const GoogleApiController = {
  textToSpeech: (text: string) => {
    return {
      url: `/voices?query=${text}&languageCode=en-US`,
    };
  },
};

export default GoogleApiController;
