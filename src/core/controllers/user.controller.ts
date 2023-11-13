import { EnrollmentRequest, IUSerRegister, IUserLogin } from "@/core/type";
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

  register: (payload: IUSerRegister) => {
    return {
      url: `/auth/register`,
      method: "POST",
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
  
};

export default UserController;
