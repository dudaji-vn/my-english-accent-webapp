import { firebaseDB } from "@/config/firebase";
import { UserType } from "@/shared/type";
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
  updateDoc,
  where,
} from "firebase/firestore";

const userPath = "user";
const userCollection = collection(firebaseDB, userPath);

const UserController = {
  login: ({ userName, password }: { userName: string; password: string }) => {
    const q = query(
      userCollection,
      and(where("name", "==", userName), where("password", "==", password)),
      limit(1)
    );
    return getDocs(q);
  },
  register: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {},
  getUsers: () => {
    const myId = "idUser2JLpns9SQblwSgNigfTwF";
    const q = query(userCollection, and(where(documentId(), "!=", myId)));
    return getDocs(q);
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
