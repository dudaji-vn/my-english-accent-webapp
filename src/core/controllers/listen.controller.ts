import { PlaylistRequest } from "../type/listen.type";

const listenPath = "listen";

const ListenController = {
  getLecturesAvailable: () => {
    return {
      url: `/${listenPath}/getLecturesAvailable`,
    };
  },

  getUsersAvailable: () => {
    return {
      url: `/${listenPath}/getUsersAvailable`,
    };
  },

  createOrUpdatePlaylist: (payload: PlaylistRequest) => {
    return {
      url: `/${listenPath}/createOrUpdatePlaylist`,
      method: "PUT",
      body: payload,
    };
  },
};

export default ListenController;
