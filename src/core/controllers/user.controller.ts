import { firebaseDB } from "@/config/firebase";
import { DocumentReference, and, collection, doc, documentId, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { IUserAuth, UserModal } from "@/core/type";
import { userConvert } from "../coverter/user.mapping";

const userPath = "user";
const userCollection = collection(firebaseDB, userPath);

const UserController = {
  // login: async (payload: IUserAuth) => {
  //   const q = query(userCollection, and(where("user_name", "==", payload.userName), where("password", "==", payload.password)), limit(1));
  //   return (await getDocs(q)).docs.map((doc) => userConvert(doc.id, doc.data() as UserModal))[0];
  // },

  login: (userId: string): boolean => {
    return true;
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
