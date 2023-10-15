import { firebaseDB } from "@/config/firebase";
import persist from "@/shared/utils/persist.util";
import {
  and,
  collection,
  doc,
  documentId,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const userPath = "user";
const userCollection = collection(firebaseDB, userPath);

const UserController = {
  login: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    const q = query(
      userCollection,
      and(where("name", "==", userName), where("password", "==", password)),
      limit(1)
    );
    return (await getDocs(q)).docs.map((doc) => ({
      userId: doc.id,
      displayLanguage: doc.data().displayLanguage,
      nativeLanguage: doc.data().nativeLanguage,
      name: doc.data().name,
      favoriteUserIds: doc.data().favoriteUserIds,
    }))[0];
  },
  register: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {},
  getUsers: async () => {
    const myId = persist.getMyInfo().userId;
    const q = query(userCollection, where(documentId(), "!=", myId));
    return (await getDocs(q)).docs.map((doc) => ({
      userId: doc.id,
      displayLanguage: doc.data().displayLanguage,
      nativeLanguage: doc.data().nativeLanguage,
      userName: doc.data().name,
    }));
  },
  getUsersBy: async (users: string[]) => {
    if (users.length) {
      const q = query(userCollection, where(documentId(), "in", users));
      return (await getDocs(q)).docs.map((doc) => ({
        userId: doc.id,
        displayLanguage: doc.data().displayLanguage,
        nativeLanguage: doc.data().nativeLanguage,
        userName: doc.data().name,
      }));
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
