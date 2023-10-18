import { firebaseDB } from "@/config/firebase";
import persist from "@/shared/utils/persist.util";
import { and, collection, doc, documentId, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { IUserAuth, UserModal } from "@/core/type";
import { userConvert } from "../coverter/user.mapping";

const userPath = "user";
const userCollection = collection(firebaseDB, userPath);

const UserController = {
  login: async (payload: IUserAuth) => {
    const q = query(userCollection, and(where("user_name", "==", payload.userName), where("password", "==", payload.password)), limit(1));
    return (await getDocs(q)).docs.map((doc) => userConvert(doc.id, doc.data() as UserModal))[0];
  },

  getUsers: async () => {
    const myId = persist.getMyInfo().userId;
    const q = query(userCollection, where(documentId(), "!=", myId));
    return (await getDocs(q)).docs.map((doc) => userConvert(doc.id, doc.data() as UserModal));
  },
  getUsersBy: async (users: string[]) => {
    if (users.length) {
      const q = query(userCollection, where(documentId(), "in", users));
      return (await getDocs(q)).docs.map((doc) => userConvert(doc.id, doc.data() as UserModal));
    }
    return [];
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
