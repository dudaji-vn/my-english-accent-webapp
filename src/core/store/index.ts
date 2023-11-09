import Reducer from "@/shared/const/store.const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VocabularyApi } from "../services";
import { EnrollmentStep } from "../type";

interface GlobalStoreType {
  recordPage: EnrollmentStep;
}

const initialState: GlobalStoreType = {
  recordPage: {
    currentStep: 0,
    enrollmentId: "",
    lectureId: "",
    stage: 0,
  },
};

const globalSlice = createSlice({
  name: Reducer.globalStore,
  initialState,
  reducers: {
    saveEnrollmentState: (state: GlobalStoreType, action: PayloadAction<EnrollmentStep>) => {},
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

export const { saveEnrollmentState } = globalSlice.actions;

export default globalSlice.reducer;
