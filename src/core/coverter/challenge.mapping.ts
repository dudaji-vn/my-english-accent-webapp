import { ChallengeModal, ChallengeResponseType } from "../type/challenge.type";

export const challengeConvert = (id: string, challenge: ChallengeModal): ChallengeResponseType => {
  return {
    challengeName: challenge.challenge_name,
    clubId: challenge.club_id,
    participants: challenge.participants,
    updated: challenge.updated,
    created: challenge.created,
    challengeId: id,
  };
};
