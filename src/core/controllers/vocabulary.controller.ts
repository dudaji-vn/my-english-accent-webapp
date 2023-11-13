import { firebaseDB } from "@/config/firebase";
import { DocumentReference, and, collection, doc, documentId, getDocs, query, where } from "firebase/firestore";
import { nativeVocbularyConvert, vocbularyConvert } from "../coverter/vocabulary.mapping";
import { NativeVocabularyModal, VocabularyModal } from "../type";

const vocabularyPath = "vocabulary";
const vocabularyCollection = collection(firebaseDB, vocabularyPath);

const VocabularyController = {
  getVocabulariesById: async (vocabulariesId: DocumentReference[]) => {
    const promises = vocabulariesId.map(async (vocabularyRef) => {
      const q = query(vocabularyCollection, where(documentId(), "==", vocabularyRef));
      return (await getDocs(q)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
    });
    return Promise.all(promises).then();
  },
  getNativeVocabulary: async (vocabulariesId: string[]) => {
    const promises = vocabulariesId.map(async (vocabulary) => {
      const vocabularyRef = doc(firebaseDB, "vocabulary", vocabulary);
      const q = query(collection(firebaseDB, "native_translation"), and(where("vocabulary_id", "==", vocabularyRef), where("native_language", "==", "vi")));
      return (await getDocs(q)).docs.map((doc) => nativeVocbularyConvert(doc.id, doc.data() as NativeVocabularyModal));
    });
    return Promise.all(promises).then();
  },

  getAllVocabulariesInLecture: (lectureId: string) => {
    return {
      url: `/${vocabularyPath}/getAllVocabulariesByLecture`,
      params: { lectureId },
    };
  },

  getVocabularyById: (vocabularyId: string) => {
    return {
      url: `/${vocabularyPath}/getVocabularyById/${vocabularyId}`,
    };
  },
};

export default VocabularyController;
