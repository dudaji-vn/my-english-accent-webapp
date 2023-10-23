import { DocumentReference, Timestamp } from "firebase/firestore";
import { ClubVocabularyTypeResponse, VocabularyTypeResponse } from "./vocabulary.type";

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

export interface IChallengeDetailDisplay {
  challengeName: string;
  clubId: DocumentReference;
  participants: DocumentReference[];
  updated: Timestamp;
  created: Timestamp;
  challengeId: string;
  vocabularies: VocabularyTypeResponse[] & ClubVocabularyTypeResponse[];
}