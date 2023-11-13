import { DocumentReference, Timestamp } from "firebase/firestore";

export interface ClubResponseType {
  clubName: string;
  description: string;
  members: DocumentReference[];
  ownerUserId: DocumentReference;
  lectures: DocumentReference[];
  updated: Date;
  created: Date;
  clubId: string;
}

export interface ClubModal {
  club_name: string;
  description: string;
  members: DocumentReference[];
  owner_user_id: DocumentReference;
  lectures: DocumentReference[];
  updated: Timestamp;
  created: Timestamp;
}

export interface ClubRequest {
  clubId?: string;
  clubName?: string;
  lectures?: string[];
  members?: string[];
}

export interface IClubDisplay {
  clubsJoined: ClubResponseType[];
  clubsOwner: ClubResponseType[];
}
