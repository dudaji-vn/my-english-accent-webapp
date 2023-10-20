import { ClubModal, ClubResponseType } from "@/core/type/club.type";

export const clubConvert = (id: string, club: ClubModal): ClubResponseType => {
  return {
    clubId: id,
    clubName: club.club_name,
    description: club.description,
    members: club.members,
    ownerUserId: club.owner_user_id,
    created: club.created,
    updated: club.updated,
  };
};