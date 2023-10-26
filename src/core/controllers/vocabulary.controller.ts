import { firebaseDB } from "@/config/firebase";
import { DocumentReference, and, collection, doc, documentId, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { clubVocbularyConvert, nativeVocbularyConvert, vocbularyConvert } from "../coverter/vocabulary.mapping";
import { ClubVocabularyModal, NativeVocabularyModal, VocabularyModal } from "../type";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";

const vocabularyPath = "vocabulary";
const vocabularyCollection = collection(firebaseDB, vocabularyPath);

const VocabularyController = {
  getVocabularies: async () => {
    return (await getDocs(vocabularyCollection)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
  },
  getVocabulariesById: async (vocabulariesId: DocumentReference[]) => {
    const promises = vocabulariesId.map(async (vocabularyRef) => {
      const q = query(vocabularyCollection, where(documentId(), "==", vocabularyRef));
      return (await getDocs(q)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
    });
    return Promise.all(promises).then();
  },
  filterVocabularies: async (lectureId: string, vocabularies: string[]) => {
    const q = query(vocabularyCollection, and(where(documentId(), "in", vocabularies), where("lecture_id", "==", lectureId)));
    return (await getDocs(q)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
  },

  getVocabularyByLecture: async (lectureId: string) => {
    const lectureRef = doc(firebaseDB, "lecture", lectureId);
    const q = query(vocabularyCollection, where("lecture_id", "==", lectureRef));
    return (await getDocs(q)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
  },

  getNativeVocabulary: async (vocabulariesId: string[]) => {
    const promises = vocabulariesId.map(async (vocabulary) => {
      const vocabularyRef = doc(firebaseDB, "vocabulary", vocabulary);
      const q = query(collection(firebaseDB, "native_translation"), and(where("vocabulary_id", "==", vocabularyRef), where("native_language", "==", "vi")));
      return (await getDocs(q)).docs.map((doc) => nativeVocbularyConvert(doc.id, doc.data() as NativeVocabularyModal));
    });
    return Promise.all(promises).then();
  },

  getVocabularyOfClub: async (challengesId: string[]) => {
    const promises = challengesId.map(async (challengeId) => {
      const challengeRef = doc(firebaseDB, "challenge", challengeId);
      const q = query(collection(firebaseDB, "club_vocabulary"), where("challenge_id", "==", challengeRef));
      return (await getDocs(q)).docs.map((doc) => clubVocbularyConvert(doc.id, doc.data() as ClubVocabularyModal));
    });
    return Promise.all(promises).then();
  },
  updateVocabularyOfClub: async (challengeId: string) => {
    const challengeRef = doc(firebaseDB, "challenge", challengeId);
    const vocabularyList = ["FFqPhagP8GPWmIt9m3dB", "JZmtmDXf1Rw0xblPIvm6", "UMFnWgQxndtMpyRFhA7C", "Y40l1XAI1rsGqo2fpaRU", "fyDni6fCZykKjDFjt5XZ"];
    const vocabularyListRef = vocabularyList.map((voca) => doc(firebaseDB, "vocabulary", voca));

    const request = vocabularyListRef.map((voca) =>
      addTimeStamp({
        challenge_id: challengeRef,
        number: 2,
        vocabulary_id: voca,
      })
    );

    return request.forEach((val) => {
      return setDoc(doc(collection(firebaseDB, "club_vocabulary")), val, { merge: true });
    });
  },
};

export default VocabularyController;
