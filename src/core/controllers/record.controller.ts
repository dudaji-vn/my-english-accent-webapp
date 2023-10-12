import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import {
  FieldPath,
  and,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { RecordRequest } from "@/core/request";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";

const recordPath = "record";
const recordCollection = collection(firebaseDB, recordPath);

const RecordController = {
  addRecord: async (payload: RecordRequest) => {
    const request = addTimeStamp(payload);
    await setDoc(doc(recordCollection, "record_" + nanoid()), request);
  },  
  updateRecord: async (id: string, payload: RecordRequest) => {
    const docRef = await setDoc(doc(recordCollection, id), payload);
    console.log("Document updated with ID: ", docRef);
  },
  removeRecord: async (id: string) => {
    const docRef = await deleteDoc(doc(recordCollection, id));
    console.log("Document remove with ID: ", docRef);
  },
  getRecords: (userId: string) => {
    const q = query(recordCollection, where("userId", "==", userId));
    return getDocs(q);
  },
};

export default RecordController;