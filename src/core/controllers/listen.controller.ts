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

  getPlaylistListenByLecture: (lectureId: string) => {
    return {
      url: `/${listenPath}/getPlaylistListenByLecture`,
      params: { lectureId },
    };
  },

  getPlaylistSummary: () => {
    return {
      url: `/${listenPath}/getPlaylistSummary`,
    };
  },
};

export default ListenController;
