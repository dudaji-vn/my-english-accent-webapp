import { ClubRequest } from "../type";

const clubPath = "club";

const ClubController = {
  getClubs: () => {
    return {
      url: `/${clubPath}/getClubsOwner`,
    };
  },

  addOrUpdateClub: (payload: ClubRequest) => {
    return {
      url: `/${clubPath}/addOrUpdateClub`,
      method: "PUT",
      body: payload,
    };
  },

  getAllMembersClub: (clubId: string) => {
    return {
      url: `/${clubPath}/getMembersInfo/${clubId}`,
    };
  },
};

export default ClubController;
