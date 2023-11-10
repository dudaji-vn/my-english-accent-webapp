const challengePath = "challenge";

const ChallengeController = {
  getChallengesInClub: (clubId: string) => {
    return {
      url: `/${challengePath}/getChallengesInClub/${clubId}`,
    };
  },

  getChallengeDetailInClub: (challengeId: string) => {
    return {
      url: `/${challengePath}/getChallengeDetailInClub/${challengeId}`,
    };
  },

  updateChallengeMember: (challengeId: string) => {
    return {
      url: `/${challengePath}/updateChallengeMember/${challengeId}`,
      method: "PATCH",
    };
  },

  getAllRecordInChallenge: (challengeId: string) => {
    return {
      url: `/${challengePath}/getAllRecordByChallenge/${challengeId}`,
    };
  },
};

export default ChallengeController;
