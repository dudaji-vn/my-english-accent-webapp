import VocabularyController from "../controllers/vocabulary.controller";
import { VocabularyRequest } from "@/core/request";

const VocabularyService = {
  addVocabulary: async (payload: VocabularyRequest) => {
    return VocabularyController.addVocabulary(payload);
  },
  updateVocabulary: async (id: string, payload: VocabularyRequest) => {
    return VocabularyController.updateVocabulary(id, payload);
  },
  removeVocabulary: async (id: string) => {
    return VocabularyController.removeVocabulary(id);
  },
};

export default VocabularyService;
