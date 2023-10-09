import connectionDB from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import {
  FieldPath,
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const userPath = "user";
const idUser = "idUser";

const UserService = {
  login: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    // await getDoc();
    // const a = doc(connectionDB, userPath, { userName, password });
  },
  register: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    // await setDoc(doc(connectionDB, userPath, idUser + nanoid()), {
    //   userName,
    //   password,
    // });

    const q = query(
      collection(connectionDB, userPath),
      and(where("userName", "==", userName), where("password", "==", password)),
      limit(1)
    );

    const res = (await getDocs(q));
    console.log(res);
    // (await getDocs(q)).forEach((doc) => {
    //   console.log(doc.id, " => ", doc.data());
    // });

    // const ref = doc(connectionDB, userPath);

    // const docSnap = await getDoc(ref);
  },
};

export default UserService;
