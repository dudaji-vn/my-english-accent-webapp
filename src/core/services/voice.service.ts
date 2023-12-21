import Reducer from "@/shared/const/store.const";
import { createApi } from "@reduxjs/toolkit/query/react";
import GoogleApiController from "../controllers/google.controller";

import baseQuery from "..";
import VoiceApiController from "../controllers/voice.controller";

export const VoiceApi = createApi({
  reducerPath: Reducer.voiceApi,
  baseQuery: baseQuery,
  tagTypes: ["TTS"],
  endpoints: (builder) => ({
    textToSpeech: builder.query<any, string>({
      query: (text: string) => VoiceApiController.textToSpeech(text),
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

export const { useLazyTextToSpeechQuery } = VoiceApi;

export default VoiceApi;
