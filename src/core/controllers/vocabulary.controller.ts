import { firebaseDB } from "@/config/firebase";
import { DocumentReference, and, collection, documentId, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { vocbularyConvert } from "../coverter/vocabulary.mapping";
import { VocabularyModal } from "../type";

const vocabularyPath = "vocabulary";
const vocabularyCollection = collection(firebaseDB, vocabularyPath);

const VocabularyController = {
  getVocabularies: async (lectureId?: string) => {
    if (lectureId) {
      const q = query(vocabularyCollection, where("lecture_id", "==", lectureId), orderBy(""));
      return (await getDocs(q)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
    } else {
      return (await getDocs(vocabularyCollection)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
    }
  },
  filterVocabularies: async (lectureId: string, vocabularies: string[]) => {
    if (vocabularies.length && lectureId) {
      const q = query(vocabularyCollection, and(where(documentId(), "in", vocabularies), where("lecture_id", "==", lectureId)));
      return (await getDocs(q)).docs.map((doc) => vocbularyConvert(doc.id, doc.data() as VocabularyModal));
    }
    return [];
  },

  findParent: async (reference: DocumentReference) => {
    return await getDoc(reference as any).then((val) => console.log(val.data()));
  },
};

export default VocabularyController;
