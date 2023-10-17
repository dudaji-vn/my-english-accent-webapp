import { firebaseDB } from "@/config/firebase";
import { DocumentReference, collection, doc, documentId, getDocs, query, where } from "firebase/firestore";
import { enrollmentConvert } from "../coverter/enrollment.mapping";
import { EnrollmentModal } from "../type/enrollment.type";
import { lectureConvert } from "../coverter/lecture.mapping";
import { LectureModal } from "../type";

const enrollment = "enrollment";
const enrollmentCollection = collection(firebaseDB, enrollment);

const EnrollmentController = {
  getEnrollmentByUser: async (userId: string) => {
    const userRef = doc(firebaseDB, "user", userId);
    const q = query(enrollmentCollection, where("user_id", "==", userRef));
    return (await getDocs(q)).docs.map((doc) => enrollmentConvert(doc.id, doc.data() as EnrollmentModal));
  },
  getEnrollmentByLectures: async (lectureId: DocumentReference[]) => {
    const promises = lectureId.map(async (lecture) => {
      const q = query(collection(firebaseDB, "lecture"), where(documentId(), "==", lecture));
      return (await getDocs(q)).docs.map((doc) => lectureConvert(doc.id, doc.data() as LectureModal));
    });
    return Promise.all(promises).then();
  },
};

export default EnrollmentController;
