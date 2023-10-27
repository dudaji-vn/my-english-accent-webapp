import { DocumentReference, Timestamp } from "firebase/firestore";
import { ClubVocabularyTypeResponse, VocabularyTypeResponse } from "./vocabulary.type";
import { RecordTypeResponse } from "./record.type";
import { UserResponseType } from "./user.type";

export interface ChallengeResponseType {
  challengeName: string;
  clubId: DocumentReference;
  participants: DocumentReference[];
  updated: Timestamp;
  created: Timestamp;
  challengeId: string;
}

export interface ChallengeModal {
  challenge_name: string;
  club_id: DocumentReference;
  participants: DocumentReference[];
  updated: Timestamp;
  created: Timestamp;
}

export interface IChallengeDisplay {
  challengeName: string;
  clubId: DocumentReference;
  participants: DocumentReference[];
  updated: Timestamp;
  created: Timestamp;
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
