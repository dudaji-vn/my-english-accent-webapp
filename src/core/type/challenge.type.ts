import { DocumentReference, Timestamp } from "firebase/firestore";
import { ClubVocabularyTypeResponse } from "./vocabulary.type";

export interface ChallengeResponseType {
  challengeMame: string;
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
  challengeMame: string;
  clubId: DocumentReference;
  participants: DocumentReference[];
  updated: Timestamp;
  created: Timestamp;
  challengeId: string;
  vocabularies: ClubVocabularyTypeResponse[];
}
