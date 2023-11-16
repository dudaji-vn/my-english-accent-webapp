import { createApi } from "@reduxjs/toolkit/query/react";

import Reducer from "@/shared/const/store.const";
import baseQuery from "..";
import ListenController from "../controllers/listen.controller";
import { LectureListenTypeResponse, PeopleistenTypeResponse, PlaylistRequest } from "../type/listen.type";

export const ListenApi = createApi({
  reducerPath: Reducer.listenApi,
  baseQuery: baseQuery,
  tagTypes: ["Listen"],
  endpoints: (builder) => ({
    getLecturesAvailable: builder.query<LectureListenTypeResponse[], void>({
      query: ListenController.getLecturesAvailable,
      transformResponse: (response: { data: LectureListenTypeResponse[] }) => response.data,
      providesTags: ["Listen"],
    }),
    getUsersAvailable: builder.query<PeopleistenTypeResponse[], void>({
      query: ListenController.getUsersAvailable,
      transformResponse: (response: { data: PeopleistenTypeResponse[] }) => response.data,
      providesTags: ["Listen"],
    }),
    createOrUpdatePlaylist: builder.mutation<boolean, PlaylistRequest>({
      query: (payload) => ListenController.createOrUpdatePlaylist(payload),
      transformResponse: (response: { data: boolean }) => response.data,
      invalidatesTags: ["Listen"],
    }),
  }),
});
export const { useGetLecturesAvailableQuery, useGetUsersAvailableQuery, useCreateOrUpdatePlaylistMutation } = ListenApi;
export default ListenApi;
