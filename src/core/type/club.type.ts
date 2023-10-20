import { DocumentReference } from "firebase/firestore";

export interface ClubResponseType {
  clubName: string;
  description: string;
  members: DocumentReference[];
  ownerUserId: DocumentReference;
  updated: string;
  created: string;
  clubId: string;
}

export interface ClubModal {
  club_name: string;
  description: string;
  members: DocumentReference[];
  owner_user_id: DocumentReference;
  updated: string;
  created: string;
}

export interface IClubDisplay {
  clubsJoined: ClubResponseType[];
  clubsOwner: ClubResponseType[];
}
