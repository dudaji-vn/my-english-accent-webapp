import { ClubVocabularyTypeResponse, VocabularyTypeResponse } from "./vocabulary.type";
import { RecordTypeResponse } from "./record.type";
import { UserResponseType } from "./user.type";

export interface ChallengeResponseType {
  challengeName: string;
  clubId: string;
  participants: string[];
  updated: Date;
  created: Date;
  challengeId: string;
}

export interface ChallengeModal {
  challenge_name: string;
  club_id: string;
  participants: string[];
  updated: Date;
  created: Date;
}

export interface IChallengeDisplay {
  challengeName: string;
  clubId: string;
  clubName: string;
  participants: string[];
  updated: Date;
  created: Date;
  challengeId: string;
  vocabularies: ClubVocabularyTypeResponse[];
}

export interface IChallengeDetailDisplay extends ChallengeResponseType {
  vocabularies: VocabularyTypeResponse[] & ClubVocabularyTypeResponse[];
}

export interface IChallengeSummaryDisplay extends Omit<ChallengeResponseType, "participants"> {
  participants: UserResponseType[];
  vocabularies: VocabularyTypeResponse[] & RecordTypeResponse[];
}

export interface IRecordOfUser extends VocabularyTypeResponse {
  recordUser: (UserResponseType & RecordTypeResponse)[];
}
export interface IListenTypePage {
  participants: IRecordOfUser[];
  vocabularies: VocabularyTypeResponse[];
}
