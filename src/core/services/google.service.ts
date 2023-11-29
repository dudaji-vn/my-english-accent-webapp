import Reducer from "@/shared/const/store.const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GoogleApiController from "../controllers/google.controller";
import { Language } from "../type";

export const GoogleApi = createApi({
  reducerPath: Reducer.googleApi,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MIDDO_URL,
    timeout: 30000,
    credentials: "same-origin",
    mode: "cors",
    redirect: "follow",
  }),
  endpoints: (builder) => ({
    textToSpeech: builder.query<any, string>({
      query: (text: string) => GoogleApiController.textToSpeech(text),
      transformResponse: (response: {
        data: {
          audioContent: {
            data: number[];
            type: string;
          };
        };
      }) => {
        return response.data.audioContent;
      },
    }),
  }),
});

export const { useLazyTextToSpeechQuery } = GoogleApi;

export default GoogleApi;
