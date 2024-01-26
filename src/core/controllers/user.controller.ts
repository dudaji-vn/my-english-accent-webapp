import { EnrollmentRequest, IAddOrUpdateGoogleTranscript, IUSerRegister, IUserLogin, IUserProfile } from "@/core/type";
import { StageExercise } from "@/shared/type";

const userPath = "user";

const UserController = {
  login: async (payload: IUserLogin) => {
    const response = await fetch(process.env.REACT_APP_URL + "/auth/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(payload),
    });
    return response.json();
  },

  isLogin: () => {
    return {
      url: "/auth/isLogin",
    };
  },
  register: (payload: IUSerRegister) => {
    return {
      url: `/auth/register`,
      method: "POST",
      body: payload,
    };
  },
  updateProfile: (payload: IUserProfile) => {
    return {
      url: "/user/updateProfile",
      method: "PATCH",
      body: payload,
    };
  },

  getLecturesBy: (stage: StageExercise) => {
    return {
      url: "/user/lectures",
      params: { stage, sort: -1 },
    };
  },

  addOrUpdateEnrollment: (payload: EnrollmentRequest) => {
    return {
      url: "/user/addOrUpdateEnrollment",
      method: "PUT",
      body: payload,
    };
  },

  getAllUsers: () => {
    return {
      url: "/user/allUsers",
    };
  },

  checkUserCompleteEvent: () => {
    return {
      url: "/user/checkUserCompleteEvent",
    };
  },
  addOrUpdateGoogleTranscript: (payload: IAddOrUpdateGoogleTranscript) => {
    return {
      url: "/user/addOrUpdateGoogleTranscript",
      method: "PUT",
      body: payload,
    };
  },
  getUsersRanking: () => {
    return {
      url: "/user/getUsersRanking",
    };
  },
};

export default UserController;
