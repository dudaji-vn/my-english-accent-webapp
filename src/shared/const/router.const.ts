const ROUTER = {
  ROOT: "/",

  AUTH: "/auth",
  LOGIN: "/login",
  REGISTER: "/register",

  LISTENING: "/listening",
  LISTENING_EMPTY_PLAYLIST: "/listening-empty-playlist",
  MANAGE_PLAYLIST: "/manage-playlist",
  CREATE_PLAYLIST: "/create-playlist",
  SELECT_LECTURE: "/select-lecture",

  RECORD: "/record",
  CERTIFICATE: "/certificate",
  RECORD_LIST: "/record/list",
  RERECORD: "/rerecord",
  CLUB: "/club",
  ADD_CLUB: "/add-club",
  CLUB_DETAIL: "/club-detail",
  CLUB_ADD_MEMBER: "/club-add-member",
  CLUB_RECORDING: "/club-recording",
  CLUB_RECORDING_SUMMARY: "/club-recording-summary",
  CLUB_LISTENING: "/club-listening",

  //subpath-club-detail
  CLUB_STUDY: "/study",
  CLUB_MEMBER: "/member",
  CLUB_INFO: "/info",

  // subpath
  SUMMARY: "/summary",
  ADDUSER: "/adduser",

  //
  INDIVIDUAL: "individual",
  TEAM: "team",
};

export default ROUTER;
