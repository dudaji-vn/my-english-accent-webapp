const challengePath = "challenge";

const ChallengeController = {
  getChallengesInClub: (clubId: string) => {
    return {
      url: `/challenge/getChallengesInClub/${clubId}`,
    };
  },

  getChallengeDetailInClub: (challengeId: string) => {
    return {
      url: `/challenge/getChallengeDetailInClub/${challengeId}`,
    };
  },

  updateChallengeMember: (challengeId: string) => {
    return {
      url: `/challenge/updateChallengeMember/${challengeId}`,
      method: "PATCH",
    };
  },
};

export default ChallengeController;
