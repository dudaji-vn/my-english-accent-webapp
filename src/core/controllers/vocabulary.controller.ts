import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { VocabularyRequest } from "@/core/request";

const vocabularyPath = "vocabulary";
const vocabularyCollection = collection(firebaseDB, vocabularyPath);

const VocabularyController = {
  addVocabulary: async (payload: VocabularyRequest) => {
    await setDoc(doc(vocabularyCollection, "vocabulary_" + nanoid()), payload);
  },
  updateVocabulary: async (id: string, payload: VocabularyRequest) => {
    await setDoc(doc(vocabularyCollection, id), payload);
  },
  removeVocabulary: async (id: string) => {
    await deleteDoc(doc(vocabularyCollection, id));
  },
};

export default VocabularyController;
