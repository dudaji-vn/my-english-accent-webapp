import { firebaseDB } from "@/config/firebase";
import { addDoc, and, collection, doc, documentId, getDocs, query, setDoc, where } from "firebase/firestore";
import { RecordModal, RecordRequest } from "@/core/type";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";
import { recordConvert } from "../coverter/record.mapping";

const recordPath = "record";
const recordCollection = collection(firebaseDB, recordPath);

const RecordController = {
  addRecord: (payload: RecordRequest) => {
    const { challengeId, vocabularyId, voiceSrc } = payload;
    // will add if no have recordId
    let challengeRef = null;
    const vocabularyRef = doc(firebaseDB, "vocabulary", vocabularyId);
    if (challengeId) {
      challengeRef = doc(firebaseDB, "challenge", challengeId);
    }

    const request = addTimeStamp({
      vocabulary_id: vocabularyRef,
      challenge_id: challengeRef,
      voice_src: voiceSrc,
    });

    addDoc(recordCollection, request);
  },
  getUserRecords: async (userId: string) => {
    const userRef = doc(firebaseDB, "user", userId);
    const q = query(recordCollection, and(where("user_id", "==", userRef), where("challenge_id", "==", null)));
    return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
  },
  getRecordsByManyUser: async (usersId: string[]) => {
    if (usersId.length) {
      const q = query(recordCollection, where("userId", "in", usersId));
      return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
    }
    return [];
  },

  getRecordsByChallengeId: async (userId: string, challengeId: string) => {
    const userRef = doc(firebaseDB, "user", userId);
    const challengeRef = doc(firebaseDB, "challenge", challengeId);
    const q = query(recordCollection, and(where("challenge_id", "==", challengeRef), where("user_id", "==", userRef)));
    return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
  },

  getRecord: async (recordId: string) => {
    const q = query(recordCollection, where(documentId(), "==", recordId));
    return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
  },

  getRecordOfUsersByChallengeId: async (usersId: string[], challengeId: string) => {
    const challengeRef = doc(firebaseDB, "challenge", challengeId);
    const promises = usersId.map(async (userId) => {
      const userRef = doc(firebaseDB, "user", userId);
      const q = query(recordCollection, and(where("challenge_id", "==", challengeRef), where("user_id", "==", userRef)));
      return (await getDocs(q)).docs.map((doc) => recordConvert(doc.id, doc.data() as RecordModal));
    });
    return Promise.all(promises).then();
  },

  addOrUpdateRecord: (payload: RecordRequest) => {
    return {
      url: "/record/addOrUpdateRecord",
      method: "PUT",
      body: payload,
    };
  },

  getMyRecordsByLecture: (lectureId: string) => {
    return {
      url: "/record/getMyRecordsByLecture",
      params: { lectureId },
    };
  },
};

export default RecordController;
