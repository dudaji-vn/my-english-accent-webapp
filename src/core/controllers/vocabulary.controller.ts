import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import { and, collection, deleteDoc, doc, documentId, getDocs, query, setDoc, where } from "firebase/firestore";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";
import { INativeVocabularyRequest, IVocabularyRequest } from "../type";

const vocabularyPath = "nativeVocabulary";
const vocabularyCollection = collection(firebaseDB, vocabularyPath);

const VocabularyController = {
  addVocabulary: (payload: IVocabularyRequest) => {
    const request = addTimeStamp(payload);
    return setDoc(doc(vocabularyCollection, "vocabularyId_" + nanoid()), request);
  },
  addNativeVocabulary: (payload: INativeVocabularyRequest) => {
    const request = addTimeStamp(payload);
    return setDoc(doc(vocabularyCollection, "nativeVocabularyId_" + nanoid()), request);
  },
  getVocabularies: async (topicId?: string) => {
    if (topicId) {
      const q = query(vocabularyCollection, where("topicId", "==", topicId));
      return (await getDocs(q)).docs.map((doc) => ({
        vocabularyId: doc.id,
        vocabularyCreated: doc.data().created,
        vocabularyIpaDisplayLanguage: doc.data().ipaDisplayLanguage,
        vocabularyTitleDisplayLanguage: doc.data().titleDisplayLanguage,
        vocabularytitleNativeLanguage: doc.data().titleNativeLanguage,
        topicId: doc.data().topicId,
        vocabularyUpdated: doc.data().updated,
        vocabularyVoiceSrc: doc.data().voiceSrc,
      }));
    } else {
      return (await getDocs(vocabularyCollection)).docs.map((doc) => ({
        vocabularyId: doc.id,
        vocabularyCreated: doc.data().created,
        vocabularyIpaDisplayLanguage: doc.data().ipaDisplayLanguage,
        vocabularyTitleDisplayLanguage: doc.data().titleDisplayLanguage,
        vocabularytitleNativeLanguage: doc.data().titleNativeLanguage,
        topicId: doc.data().topicId,
        vocabularyUpdated: doc.data().updated,
        vocabularyVoiceSrc: doc.data().voiceSrc,
      }));
    }
  },
  filterVocabularies: async (topicId: string, vocabularies: string[]) => {
    if (vocabularies.length && topicId) {
      const q = query(vocabularyCollection, and(where(documentId(), "in", vocabularies), where("topicId", "==", topicId)));
      return (await getDocs(q)).docs.map((doc) => ({
        vocabularyId: doc.id,
        vocabularyCreated: doc.data().created,
        vocabularyIpaDisplayLanguage: doc.data().ipaDisplayLanguage,
        vocabularyTitleDisplayLanguage: doc.data().titleDisplayLanguage,
        vocabularytitleNativeLanguage: doc.data().titleNativeLanguage,
        topicId: doc.data().topicId,
        vocabularyUpdated: doc.data().updated,
        vocabularyVoiceSrc: doc.data().voiceSrc,
      }));
    }
    return [];
  },
};

export default VocabularyController;
