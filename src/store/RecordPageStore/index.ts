import { VocabularyApi } from "@/core/services";
import Store from "@/shared/const/store.const";
import { IExerciseType, StageExercise, TopicUIType, VocabularyType } from "@/shared/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IExerciseType = {
  store: [],
  filter: {
    topicId: "",
    stage: StageExercise.Close,
    totalPhrase: 0,
    currentPhrase: 0,
    name: "",
  },
  vocabularies: [],
  vocabularyIndex: 0,
};

const recordPageStore = createSlice({
  name: Store.recordPage,
  initialState,
  reducers: {
    saveSelection: (state, { payload }: PayloadAction<Omit<TopicUIType, "imgSrc">>) => {
      const { vocabularies, ...restPayload } = payload;
      const result = {
        ...state.filter,
        ...restPayload,
      };
      //store
      state.filter = {
        ...result,
      };
      state.vocabularies = vocabularies;
    },
    nextVocabulary: (state) => {
      state.vocabularyIndex = state.vocabularyIndex + 1;
    },
    resetVocabularyIndex: (state) => {
      state.vocabularyIndex = 0;
    },
    saveVocabularies: (state, { payload }: PayloadAction<VocabularyType[]>) => {
      state.vocabularies = payload;
    },
  },
});

export const { saveSelection, saveVocabularies, nextVocabulary, resetVocabularyIndex } = recordPageStore.actions;

export default recordPageStore.reducer;