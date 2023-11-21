import Reducer from "@/shared/const/store.const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VocabularyApi } from "../services";
import { EnrollmentStep, LectureResponseType } from "../type";
import ListenApi from "../services/listen.service";
import { UserPlayingType } from "@/components/PlaylistPod";

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
    currentLectureIndex: number;
    totalLecture: number;
    isTheLastVocabulary: boolean;
    usersRecord: UserPlayingType[];
  };
  listenSetting: {
    isPlaying: boolean;
    isLoop: boolean;
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
    currentLectureIndex: 0,
    totalLecture: 0,
    usersRecord: [],
    isTheLastVocabulary: false,
  },
  listenSetting: {
    isPlaying: false,
    isLoop: false,
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
        currentLectureIndex: index,
        lectureId: action.payload,
      };
    },

    updateIndexListenPage: (state: GlobalStoreType, action: PayloadAction<number>) => {
      const currentIndex = state.listenPage.currentLectureIndex;
      const newIndex = currentIndex + action.payload;

      state.listenPage = {
        ...state.listenPage,
        currentLectureIndex: newIndex,
        lectureId: state.listenPage.lectures[newIndex].lectureId,
      };
    },

    updateIsTheLastVocabulary: (state: GlobalStoreType, action: PayloadAction<boolean>) => {
      state.listenPage = {
        ...state.listenPage,
        isTheLastVocabulary: action.payload,
      };
    },

    updateIsLoop: (state: GlobalStoreType) => {
      state.listenSetting = {
        ...state.listenSetting,
        isLoop: !state.listenSetting.isLoop,
      };
    },

    updateIsPlaying: (state: GlobalStoreType, action: PayloadAction<boolean>) => {
      state.listenSetting = {
        ...state.listenSetting,
        isPlaying: action.payload,
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
        currentLectureIndex: 0,
        lectureId: lectures[0]?.lectureId,
        totalLecture: lectures.length,
        usersRecord: [],
        isTheLastVocabulary: false,
      };
    });
    builder.addMatcher(ListenApi.endpoints.getPlaylistListenByLecture.matchFulfilled, (state, action) => {
      const { participants } = action.payload;

      if (participants.length) {
        const usersRecord = participants[0].recordUser.map((user) => ({ ...user, isPlaying: false, isPlayed: false }));
        state.listenPage = {
          ...state.listenPage,
          usersRecord,
        };
      } else {
        state.listenPage = {
          ...state.listenPage,
          usersRecord: [],
        };
      }
    });
  },
});

export const { saveAudio, setPlayAll, nextIndex, resetCLubPage, updateLectureIdListenPage, updateIndexListenPage, updateIsTheLastVocabulary, updateIsLoop, updateIsPlaying } =
  globalSlice.actions;

export default globalSlice.reducer;
