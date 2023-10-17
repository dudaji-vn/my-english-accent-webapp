import { firebaseDB } from "@/config/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { RecordModal, RecordRequest } from "@/core/type";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";
import { recordConvert } from "../coverter/record.mapping";

const recordPath = "record";
const recordCollection = collection(firebaseDB, recordPath);

const RecordController = {
  addRecord: (payload: RecordRequest) => {
    const request = addTimeStamp(payload);
    console.log("request::", payload);
    addDoc(recordCollection, request);
  },
  getRecords: async (userId: string) => {
    const q = query(recordCollection, where("userId", "==", userId));
    return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
  },
  getRecordsByManyUser: async (usersId: string[]) => {
    if (usersId.length) {
      const q = query(recordCollection, where("userId", "in", usersId));
      return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
    }
    return [];
  },
};

export default RecordController;
