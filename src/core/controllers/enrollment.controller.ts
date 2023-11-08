import { firebaseDB } from "@/config/firebase";
import { DocumentReference, collection, doc, documentId, getDocs, query, updateDoc, where } from "firebase/firestore";
import { enrollmentConvert } from "../coverter/enrollment.mapping";
import { EnrollmentModal } from "../type/enrollment.type";

const enrollmentPath = "enrollment";
const enrollmentCollection = collection(firebaseDB, enrollmentPath);

const EnrollmentController = {
  getEnrollmentByLecture: async (lectureId: string) => {
    const lectureRef = doc(firebaseDB, "lecture", lectureId);
    const q = query(enrollmentCollection, where("lecture_id", "==", lectureRef));
    return (await getDocs(q)).docs.map((doc) => enrollmentConvert(doc.id, doc.data() as EnrollmentModal));
  },
  updateEnrollment: async (payload: { enrollmentId: string; current_step: number; stage: number }) => {
    const { enrollmentId, ...restPayload } = payload;
    const enrollRef = doc(firebaseDB, enrollmentPath, enrollmentId);
    await updateDoc(enrollRef, restPayload);
  },
};

export default EnrollmentController;
