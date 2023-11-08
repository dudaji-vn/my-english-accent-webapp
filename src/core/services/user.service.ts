import { createApi } from "@reduxjs/toolkit/query/react";
import Reducer from "@/shared/const/store.const";
import { IUSerRegister, UserResponseType } from "../type";
import baseQuery from "..";
import UserController from "../controllers/user.controller";

export const UserApi = createApi({
  reducerPath: Reducer.userApi,
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    register: builder.mutation<{ token: string; user: UserResponseType }, IUSerRegister>({
      query: UserController.register,
      transformResponse: (response: { data: { token: string; user: UserResponseType } }) => {
        return response.data;
      },
    }),
  }),
});

export const { useRegisterMutation } = UserApi;

export default UserApi;
