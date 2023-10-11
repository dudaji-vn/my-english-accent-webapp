import Query from "@/shared/const/queryApi.const";
import VocabularyController from "../controllers/vocabulary.controller";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const VocabularyApi = createApi({
  reducerPath: Query.vocabulary,
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getVocabularies: builder.query<any, void>({
      async queryFn() {
        try {
          const vocabularies: any = [];
          await (
            await VocabularyController.getVocabularies()
          ).forEach((value) => {
            vocabularies.push({ vocabularyId: value.id, ...value.data() });
          });
          return { data: vocabularies };
        } catch (error) {
          return { error };
        }
      },
    }),
  }),
});

export const { useGetVocabulariesQuery } = VocabularyApi;
