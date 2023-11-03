import { firebaseDB } from "@/config/firebase";
import { collection, documentId, getDocs, query, where } from "firebase/firestore";
import { lectureConvert } from "../coverter/lecture.mapping";
import { LectureModal } from "../type";

const lecturePath = "lecture";
const lectureCollection = collection(firebaseDB, lecturePath);

const LectureController = {
  getLectureById: async (lectureId: string) => {
    const q = query(lectureCollection, where(documentId(), "==", lectureId));
    return (await getDocs(q)).docs.map((doc) => lectureConvert(doc.id, doc.data() as LectureModal))[0];
  },
  getLectures: () => {
    return {
      url: "/lecture/all",
    };
  },
};

export default LectureController;
