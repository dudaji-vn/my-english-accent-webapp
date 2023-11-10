import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";

import { NativeVocabularyTypeResponse, VocabularyTypeResponse } from "@/core/type";
import Reducer from "@/shared/const/store.const";
import VocabularyController from "../controllers/vocabulary.controller";
import { DocumentReference } from "firebase/firestore";

export const RecordProgress = createApi({
  reducerPath: Reducer.recordProgressApi,
  baseQuery: fakeBaseQuery(),
  tagTypes: ["RecordProgress"],
  endpoints: (builder) => ({
    getVocabularyByRecord: builder.query<VocabularyTypeResponse & NativeVocabularyTypeResponse, DocumentReference>({
      async queryFn(vocabularyId: DocumentReference) {
        try {
          const vocabularies = (await VocabularyController.getVocabulariesById([vocabularyId])).flat();
          const nativeVocabulaies: NativeVocabularyTypeResponse[] = [];
          await VocabularyController.getNativeVocabulary([vocabularies[0].vocabularyId]).then((val) => nativeVocabulaies.push(...val.flat()));
          const mergeVocabulary = _.merge({}, vocabularies, nativeVocabulaies);
          return { data: mergeVocabulary[0] };
        } catch (error) {
          return { error };
        }
      },
      providesTags: ["RecordProgress"],
    }),
  }),
});
export const { useGetVocabularyByRecordQuery } = RecordProgress;
export default RecordProgress;
