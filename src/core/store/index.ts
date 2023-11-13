import Reducer from "@/shared/const/store.const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VocabularyApi } from "../services";
import { EnrollmentStep } from "../type";

interface GlobalStoreType {
  recordPage: EnrollmentStep;
  clubPage: {
    audio: any;
  };
}

const initialState: GlobalStoreType = {
  recordPage: {
    currentStep: 0,
    enrollmentId: "",
    lectureId: "",
    stage: 0,
  },
  clubPage: { audio: new Audio() },
};

const globalSlice = createSlice({
  name: Reducer.globalStore,
  initialState,
  reducers: {
    saveAudio: (state: GlobalStoreType, action: PayloadAction<string>) => {
      state.clubPage.audio.src = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addMatcher(VocabularyApi.endpoints.getAllVocabulariesInLecture.matchFulfilled, (state, action) => {
      state.recordPage = {
        ...action.payload,
      };
    });
    builder.addMatcher(VocabularyApi.endpoints.enrollLecture.matchFulfilled, (state, action) => {
      state.recordPage = {
        ...action.payload,
      };
    });
  },
});

export const { saveAudio } = globalSlice.actions;

export default globalSlice.reducer;
