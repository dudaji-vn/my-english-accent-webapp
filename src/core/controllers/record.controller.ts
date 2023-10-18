import { firebaseDB } from "@/config/firebase";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { RecordModal, RecordRequest } from "@/core/type";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";
import { recordConvert } from "../coverter/record.mapping";

const recordPath = "record";
const recordCollection = collection(firebaseDB, recordPath);

const RecordController = {
  addRecord: (payload: RecordRequest) => {
    const { userId, clubStudyId, vocabularyId, voiceSrc } = payload;

    let clubRef = null;
    const userRef = doc(firebaseDB, "user", userId);
    const vocabularyRef = doc(firebaseDB, "vocabulary", vocabularyId);
    if (clubStudyId) {
      clubRef = doc(firebaseDB, "club", clubStudyId);
    }

    const request = addTimeStamp({
      vocabulary_id: vocabularyRef,
      user_id: userRef,
      club_id: clubRef,
      voice_src: voiceSrc,
    });

    addDoc(recordCollection, request);
  },
  getUserRecords: async (userId: string) => {
    const userRef = doc(firebaseDB, "user", userId);
    const q = query(recordCollection, where("user_id", "==", userRef));
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
