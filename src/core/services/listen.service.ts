import { createApi } from "@reduxjs/toolkit/query/react";

import Reducer from "@/shared/const/store.const";
import baseQuery from "..";
import ListenController from "../controllers/listen.controller";
import { LectureListenTypeResponse, PeopleistenTypeResponse, PlaylistDetailLecture, PlaylistLecture, PlaylistRequest } from "../type/listen.type";

export const ListenApi = createApi({
  reducerPath: Reducer.listenApi,
  baseQuery: baseQuery,
  tagTypes: ["Listen"],
  endpoints: (builder) => ({
    getLecturesAvailable: builder.query<LectureListenTypeResponse[], void>({
      query: ListenController.getLecturesAvailable,
      transformResponse: (response: { data: LectureListenTypeResponse[] }) => response.data,
    }),
    getUsersAvailable: builder.query<PeopleistenTypeResponse[], void>({
      query: ListenController.getUsersAvailable,
      transformResponse: (response: { data: PeopleistenTypeResponse[] }) => response.data,
    }),
    createOrUpdatePlaylist: builder.mutation<boolean, PlaylistRequest>({
      query: (payload) => ListenController.createOrUpdatePlaylist(payload),
      transformResponse: (response: { data: boolean }) => response.data,
    }),
    getPlaylistListenByLecture: builder.query<PlaylistDetailLecture, string>({
      query: (payload) => ListenController.getPlaylistListenByLecture(payload),
      transformResponse: (response: { data: PlaylistDetailLecture }) => response.data,
    }),
    getPlaylistSummary: builder.query<PlaylistLecture, void>({
      query: ListenController.getPlaylistSummary,
      transformResponse: (response: { data: PlaylistLecture }) => response.data,
    }),
  }),
});
export const { useGetLecturesAvailableQuery, useGetUsersAvailableQuery, useCreateOrUpdatePlaylistMutation, useGetPlaylistListenByLectureQuery, useGetPlaylistSummaryQuery } =
  ListenApi;
export default ListenApi;
