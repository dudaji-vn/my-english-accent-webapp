import Reducer from "@/shared/const/store.const";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import GoogleApiController from "../controllers/google.controller";

export const GoogleApi = createApi({
  reducerPath: Reducer.googleApi,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_MIDDO_URL,
    timeout: 30000,
    credentials: "same-origin",
    mode: "cors",
    redirect: "follow",
  }),
  tagTypes: ["TTS"],
  endpoints: (builder) => ({
    textToSpeech: builder.query<any, string>({
      query: (text: string) => GoogleApiController.textToSpeech(text),
      providesTags: (result, error, arg) => (arg ? [{ type: "TTS" as const, text: arg }, "TTS"] : ["TTS"]),
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
