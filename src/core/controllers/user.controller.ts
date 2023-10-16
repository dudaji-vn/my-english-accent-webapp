import { firebaseDB } from "@/config/firebase";
import persist from "@/shared/utils/persist.util";
<<<<<<< Updated upstream
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
=======
import { and, collection, doc, documentId, getDocs, limit, query, setDoc, where } from "firebase/firestore";
import { IUserRegister } from "../type";
import { nanoid } from "@reduxjs/toolkit";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";
>>>>>>> Stashed changes

const userPath = "user";
const userCollection = collection(firebaseDB, userPath);

const UserController = {
<<<<<<< Updated upstream
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
=======
  login: async ({ userName, password }: { userName: string; password: string }) => {
    const q = query(userCollection, and(where("user_name", "==", userName), where("password", "==", password)), limit(1));
>>>>>>> Stashed changes
    return (await getDocs(q)).docs.map((doc) => ({
      userId: doc.id,
      displayLanguage: doc.data().displayLanguage,
      nativeLanguage: doc.data().nativeLanguage,
      name: doc.data().name,
      favoriteUserIds: doc.data().favoriteUserIds,
    }))[0];
  },
<<<<<<< Updated upstream
  register: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {},
=======
  register: async (payload: IUserRegister) => {
    const userRef = doc(userCollection, `userId_${nanoid()}`);
    const request = addTimeStamp(payload);
    return setDoc(userRef, request);
  },
>>>>>>> Stashed changes
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
