import { firebaseDB } from "@/config/firebase";
import { DocumentReference, collection, doc, documentId, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { EnrollmentRequest, IUSerRegister, IUserLogin, UserModal, UserResponseType } from "@/core/type";
import { userConvert } from "../coverter/user.mapping";
import { StageExercise } from "@/shared/type";

const userPath = "user";
const userCollection = collection(firebaseDB, userPath);

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

  getUsers: async (userId: string) => {
    const q = query(userCollection, where(documentId(), "!=", userId));
    return (await getDocs(q)).docs.map((doc) => userConvert(doc.id, doc.data() as UserModal));
  },
  getUsersBy: async (users: DocumentReference[]) => {
    const promises = users.map(async (user) => {
      const q = query(userCollection, where(documentId(), "==", user));
      return (await getDocs(q)).docs.map((doc) => userConvert(doc.id, doc.data() as UserModal));
    });
    return Promise.all(promises).then();
  },
  favoriteUsers: (myId: string, usersId: string[]) => {
    const userRef = doc(userCollection, myId);
    return setDoc(
      userRef,
      {
        favoriteUserIds: usersId,
      },
      { merge: true }
    );
  },
};

export default UserController;
