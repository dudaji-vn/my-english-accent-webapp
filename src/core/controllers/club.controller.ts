import { ClubRequest } from "../type";

const clubPath = "club";

const ClubController = {
  getClubs: () => {
    return {
      url: `/${clubPath}/getClubsOwner`,
    };
  },

  addClub: (payload: ClubRequest) => {
    return {
      url: `/${clubPath}/addOrUpdateClub`,
      method: "POST",
      body: payload,
    };
  },

  updateClub: (payload: ClubRequest) => {
    return {
      url: `/${clubPath}/addOrUpdateClub`,
      method: "PUT",
      body: payload,
    };
  },
};

export default ClubController;
