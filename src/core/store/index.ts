import Reducer from "@/shared/const/store.const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VocabularyApi } from "../services";
import { EnrollmentStep } from "../type";

interface GlobalStoreType {
  recordPage: EnrollmentStep;
  clubPage: {
    voiceSrc: string;
    recordId: string;
    isPlayAll: boolean;
    audioIndex: number;
  };
}

const initialState: GlobalStoreType = {
  recordPage: {
    currentStep: 0,
    enrollmentId: "",
    lectureId: "",
    stage: 0,
  },
  clubPage: { recordId: "", voiceSrc: "", isPlayAll: false, audioIndex: 0 },
};

const globalSlice = createSlice({
  name: Reducer.globalStore,
  initialState,
  reducers: {
    saveAudio: (
      state: GlobalStoreType,
      action: PayloadAction<{
        voiceSrc: string;
        recordId: string;
      }>
    ) => {
      state.clubPage = {
        ...state.clubPage,
        ...action.payload,
      };
    },
    setPlayAll: (state: GlobalStoreType) => {
      state.clubPage = {
        ...state.clubPage,
        isPlayAll: !state.clubPage.isPlayAll,
      };
    },
    nextIndex: (state: GlobalStoreType) => {
      state.clubPage = {
        ...state.clubPage,
        audioIndex: state.clubPage.audioIndex + 1,
      };
    },
    resetCLubPage: (state: GlobalStoreType) => {
      state.clubPage = { recordId: "", voiceSrc: "", isPlayAll: false, audioIndex: 0 };
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

export const { saveAudio, setPlayAll, nextIndex, resetCLubPage } = globalSlice.actions;

export default globalSlice.reducer;
