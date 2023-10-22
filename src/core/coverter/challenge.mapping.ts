import { ChallengeModal, ChallengeResponseType } from "../type/challenge.type";

export const challengeConvert = (id: string, challenge: ChallengeModal): ChallengeResponseType => {
  return {
    challengeMame: challenge.challenge_name,
    clubId: challenge.club_id,
    participants: challenge.participants,
    updated: challenge.updated,
    created: challenge.created,
    challengeId: id,
  };
};
