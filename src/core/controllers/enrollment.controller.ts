import { firebaseDB } from "@/config/firebase";
import { DocumentReference, collection, doc, documentId, getDocs, query, updateDoc, where } from "firebase/firestore";
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
  getEnrollmentByLectures: async (lecturesId: DocumentReference[]) => {
    const promises = lecturesId.map(async (lecture) => {
      const q = query(collection(firebaseDB, "lecture"), where(documentId(), "==", lecture));
      return (await getDocs(q)).docs.map((doc) => lectureConvert(doc.id, doc.data() as LectureModal));
    });
    return Promise.all(promises).then();
  },
  getEnrollmentByLecture: async (lectureId: string) => {
    const lectureRef = doc(firebaseDB, "lecture", lectureId);
    const q = query(enrollmentCollection, where("lecture_id", "==", lectureRef));
    return (await getDocs(q)).docs.map((doc) => enrollmentConvert(doc.id, doc.data() as EnrollmentModal));
  },
  updateEnrollment: async (payload: { enrollmentId: string; current_step: number; stage: string }) => {
    const { enrollmentId, ...restPayload } = payload;
    console.log(payload);
    const enrollRef = doc(firebaseDB, enrollment, enrollmentId);
    await updateDoc(enrollRef, restPayload);
  },
};

export default EnrollmentController;
