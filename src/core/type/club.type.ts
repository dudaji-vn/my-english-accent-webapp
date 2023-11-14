export interface ClubResponseType {
  clubName: string;
  description: string;
  members: string[];
  ownerUserId: string;
  lectures: string[];
  updated: Date;
  created: Date;
  clubId: string;
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
