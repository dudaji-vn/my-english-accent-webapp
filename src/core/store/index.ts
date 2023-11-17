import Reducer from "@/shared/const/store.const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VocabularyApi } from "../services";
import { EnrollmentStep, LectureResponseType } from "../type";
import ListenApi from "../services/listen.service";

interface GlobalStoreType {
  recordPage: EnrollmentStep;
  clubPage: {
    voiceSrc: string;
    recordId: string;
    isPlayAll: boolean;
    audioIndex: number;
  };
  listenPage: {
    lectures: LectureResponseType[];
    lectureId: string;
    currentIndex: number;
    total: number;
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
  listenPage: {
    lectures: [],
    lectureId: "",
    currentIndex: 0,
    total: 0,
  },
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

    updateLectureIdListenPage: (state: GlobalStoreType, action: PayloadAction<string>) => {
      const index = state.listenPage.lectures.findIndex((lecture) => lecture.lectureId === action.payload);

      state.listenPage = {
        ...state.listenPage,
        currentIndex: index,
        lectureId: action.payload,
      };
    },

    updateIndexListenPage: (state: GlobalStoreType, action: PayloadAction<number>) => {
      const currentIndex = state.listenPage.currentIndex;
      const newIndex = currentIndex + action.payload;

      state.listenPage = {
        ...state.listenPage,
        currentIndex: newIndex,
        lectureId: state.listenPage.lectures[newIndex].lectureId,
      };
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
    builder.addMatcher(ListenApi.endpoints.getPlaylistSummary.matchFulfilled, (state, action) => {
      const lectures = action.payload?.lectures;

      state.listenPage = {
        lectures,
        currentIndex: 0,
        lectureId: lectures[0].lectureId,
        total: lectures.length,
      };
    });
  },
});

export const { saveAudio, setPlayAll, nextIndex, resetCLubPage, updateLectureIdListenPage, updateIndexListenPage } = globalSlice.actions;

export default globalSlice.reducer;
