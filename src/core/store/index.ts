import Reducer from "@/shared/const/store.const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi, VocabularyApi } from "../services";
import { EnrollmentStep, LectureResponseType } from "../type";
import ListenApi from "../services/listen.service";
import { UserPlayingType } from "@/components/PlaylistPod";
import { ModalType } from "@/shared/const/modal-type.const";
import { EVENT_STATUS } from "@/shared/const/event.const";

interface GlobalStoreType {
  user: {
    isAuthenticated: boolean;
  };
  recordPage: EnrollmentStep;
  recordAudio: {
    disableAllAction: boolean;
    isInProgress: boolean;
  };
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
  currentRecordTab: number | null;
  modal: {
    type: string;
  };
  leaderBoardPage: {
    lectures: LectureResponseType[];
    lectureId: string;
    userId: string;
    currentLectureIndex: number;
  };
}

const initialState: GlobalStoreType = {
  user: { isAuthenticated: false },
  recordPage: {
    currentStep: 0,
    enrollmentId: "",
    lectureId: "",
    stage: 0,
  },
  recordAudio: {
    disableAllAction: false,
    isInProgress: false,
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
  currentRecordTab: null,
  modal: {
    type: "",
  },
  leaderBoardPage: {
    lectures: [],
    lectureId: "",
    userId: "",
    currentLectureIndex: 0,
  },
};

const globalSlice = createSlice({
  name: Reducer.globalStore,
  initialState,
  reducers: {
    setIsAuthenticated: (state: GlobalStoreType, action: PayloadAction<boolean>) => {
      state.user.isAuthenticated = action.payload;
    },
    setIsInRecordProgress: (state: GlobalStoreType, action: PayloadAction<boolean>) => {
      state.recordAudio.isInProgress = action.payload;
    },

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

    updateDisableAllAction: (state: GlobalStoreType, action: PayloadAction<boolean>) => {
      state.recordAudio = {
        ...state.recordAudio,
        disableAllAction: action.payload,
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
    updateLectureIdLeaderBoardPage: (state: GlobalStoreType, action: PayloadAction<string>) => {
      const index = state.leaderBoardPage.lectures.findIndex((lecture) => lecture.lectureId === action.payload);

      state.leaderBoardPage = {
        ...state.leaderBoardPage,
        currentLectureIndex: index,
        lectureId: action.payload,
      };
    },

    updateIndexListenPage: (state: GlobalStoreType, action: PayloadAction<number>) => {
      const currentIndex = state.listenPage.currentLectureIndex;
      const numberVocabularies = state.listenPage.lectures.length;
      const newIndex = currentIndex + action.payload;

      if (newIndex >= numberVocabularies) {
        return;
      }
      state.listenPage = {
        ...state.listenPage,
        currentLectureIndex: newIndex,
        lectureId: state.listenPage.lectures[newIndex].lectureId,
      };
    },
    updateIndexLectureLeaderPage: (state: GlobalStoreType, action: PayloadAction<number>) => {
      const currentIndex = state.leaderBoardPage.currentLectureIndex;
      const numberLectures = state.leaderBoardPage.lectures.length;
      const newIndex = currentIndex + action.payload;

      if (newIndex >= numberLectures) {
        return;
      }
      state.leaderBoardPage = {
        ...state.leaderBoardPage,
        currentLectureIndex: newIndex,
        lectureId: state.leaderBoardPage.lectures[newIndex].lectureId,
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
    changeRecordTab(state, action: PayloadAction<number>) {
      state.currentRecordTab = action.payload;
    },
    toggleModal(state, action: PayloadAction<string | undefined>) {
      state.modal.type = action.payload || "";
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
    builder.addMatcher(UserApi.endpoints.getPlaylistSummaryByUser.matchFulfilled, (state, action) => {
      const { lectures, userId } = action.payload;

      state.leaderBoardPage = {
        lectures,
        lectureId: lectures[0]?.lectureId,
        currentLectureIndex: 0,
        userId: userId,
      };
    });
    builder.addMatcher(UserApi.endpoints.checkUserCompleteEvent.matchFulfilled, (state, action) => {
      const status = action.payload?.status || "";
      if (status === EVENT_STATUS.WIN) {
        state.modal.type = ModalType.CONGRATULATION;
      }
      if (status === EVENT_STATUS.CLOSE) {
        state.modal.type = ModalType.EVENT_END;
      }
      if (status === EVENT_STATUS.MAX_WINNER) {
        state.modal.type = ModalType.MAX_WINNER;
      }
      if (!status) {
        state.modal.type = "";
      }
    });
  },
});

export const {
  saveAudio,
  setPlayAll,
  nextIndex,
  resetCLubPage,
  updateLectureIdListenPage,
  updateIndexListenPage,
  updateIsTheLastVocabulary,
  updateIsLoop,
  updateIsPlaying,
  updateDisableAllAction,
  changeRecordTab,
  toggleModal,
  setIsAuthenticated,
  setIsInRecordProgress,
  updateLectureIdLeaderBoardPage,
  updateIndexLectureLeaderPage,
} = globalSlice.actions;

export default globalSlice.reducer;
