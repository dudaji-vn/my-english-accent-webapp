import { createApi } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import {
  IAddOrUpdateGoogleTranscript,
  IIsUserWinEvent,
  IPlaylistUserRequest,
  IUSerRegister,
  IPlaylistUserSummaryResponse,
  IUserProfile,
  IUserRanking,
  UserResponseType,
  IPlaylistUserResponse,
  IUserRankingRequest,
  ISummaryUserResponse,
} from "../type";
import baseQuery from "..";
import UserController from "../controllers/user.controller";

export const UserApi = createApi({
  reducerPath: Reducer.userApi,
  baseQuery: baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation<{ token: string; user: UserResponseType }, IUSerRegister>({
      query: UserController.register,
      transformResponse: (response: { data: { token: string; user: UserResponseType } }) => {
        return response.data;
      },
    }),
    isLogin: builder.query<IUserProfile, void>({
      query: UserController.isLogin,
      keepUnusedDataFor: 0,
      transformResponse: (response: { data: IUserProfile }) => {
        return response.data;
      },
    }),
    checkUserCompleteEvent: builder.query<IIsUserWinEvent, void>({
      query: () => UserController.checkUserCompleteEvent(),
      transformResponse: (response: { data: IIsUserWinEvent }) => {
        return response.data;
      },
    }),
    getAllUsers: builder.query<UserResponseType[], void>({
      query: UserController.getAllUsers,
      transformResponse: (response: { data: UserResponseType[] }) => {
        return response.data;
      },
    }),
    addOrUpdateGoogleTranscript: builder.mutation<boolean, IAddOrUpdateGoogleTranscript>({
      query: UserController.addOrUpdateGoogleTranscript,
      transformResponse: (response: { data: boolean }) => response.data,
    }),
    updateProfile: builder.mutation<IUserProfile, IUserProfile>({
      query: UserController.updateProfile,
      transformResponse: (response: { data: IUserProfile }) => response.data,
    }),
    getUsersRanking: builder.query<IUserRanking[], void>({
      keepUnusedDataFor: 0,
      query: UserController.getUsersRanking,
      transformResponse: (response: { data: IUserRanking[] }) => {
        return response.data;
      },
    }),
    getPlaylistSummaryByUser: builder.query<IPlaylistUserSummaryResponse, string>({
      keepUnusedDataFor: 0,
      query: (userId) => UserController.getPlaylistSummaryByUser(userId),
      transformResponse: (response: { data: IPlaylistUserSummaryResponse }) => {
        return response.data;
      },
    }),
    getPlaylistByUser: builder.query<IPlaylistUserResponse, IPlaylistUserRequest>({
      query: UserController.getPlaylistByUser,
      transformResponse: (response: { data: IPlaylistUserResponse }) => {
        return response.data;
      },
      providesTags: (result, error, arg) => {
        return arg ? [{ type: "User" as const, lectureId: arg.lectureId, userId: arg.userId }, "User"] : ["User"];
      },
    }),
    likeOrUnlikePlaylistByUser: builder.mutation<boolean, IUserRankingRequest>({
      query: UserController.likeOrUnlikePlaylistByUser,
      transformResponse: (response: { data: boolean }) => response.data,
      invalidatesTags: (result, error, arg) =>
        arg ? [{ type: "User" as const, lectureId: arg.lectureId, userId: arg.userId }, "User"] : ["User"],
    }),
    getSummary: builder.query<ISummaryUserResponse, void>({
      keepUnusedDataFor: 0,
      query: UserController.getSummary,
      transformResponse: (response: { data: ISummaryUserResponse }) => {
        return response.data;
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLazyIsLoginQuery,
  useGetAllUsersQuery,
  useLazyCheckUserCompleteEventQuery,
  useUpdateProfileMutation,
  useAddOrUpdateGoogleTranscriptMutation,
  useGetUsersRankingQuery,
  useGetPlaylistSummaryByUserQuery,
  useLazyGetPlaylistByUserQuery,
  useLazyGetPlaylistSummaryByUserQuery,
  useLikeOrUnlikePlaylistByUserMutation,
  useGetSummaryQuery,
} = UserApi;

export default UserApi;
