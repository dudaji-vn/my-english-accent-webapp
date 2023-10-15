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
    console.log("request::", payload);
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
  getRecords: async (userId: string) => {
    const q = query(recordCollection, where("userId", "==", userId));
    return (await getDocs(q)).docs.map((doc) => ({
      recordId: doc.id,
      clubStudyId: doc.data().clubStudyId,
      recordCreated: doc.data().created,
      recordUpdated: doc.data().updated,
      userId: doc.data().userId,
      vocabularyId: doc.data().vocabularyId,
      recordVoiceSrc: doc.data().voiceSrc,
    }));
  },
  getRecordsByManyUser: async (usersId: string[]) => {
    if (usersId.length) {
      const q = query(recordCollection, where("userId", "in", usersId));
      return (await getDocs(q)).docs.map((doc) => ({
        recordId: doc.id,
        clubStudyId: doc.data().clubStudyId,
        recordCreated: doc.data().created,
        recordUpdated: doc.data().updated,
        userId: doc.data().userId,
        vocabularyId: doc.data().vocabularyId,
        recordVoiceSrc: doc.data().voiceSrc,
      }));
    }
    return [];
  },
};

export default RecordController;
