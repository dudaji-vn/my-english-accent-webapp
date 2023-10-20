import { firebaseDB } from "@/config/firebase";
import { DocumentReference, collection, doc, documentId, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ClubModal, LectureModal } from "../type";
import { clubConvert } from "../coverter/club.mapping";

const club = "club";
const clubCollection = collection(firebaseDB, club);

const ClubController = {
  getClubByUserId: async (userId: string, key: "owner_user_id" | "members") => {
    // const promises = usersId.map(async (userId) => {
    //   const userRef = doc(firebaseDB, "user", userId);
    //   const q = query(clubCollection, where(key, "==", userRef));
    //   console.log(key, userRef);
    //   return (await getDocs(q)).docs.map((doc) => clubConvert(doc.id, doc.data() as ClubModal));
    // });
    // return Promise.all(promises).then();
    const userRef = doc(firebaseDB, "user", userId);
    const q = query(clubCollection, where(key, "==", userRef));
    console.log(key, userRef);
    return (await getDocs(q)).docs.map((doc) => clubConvert(doc.id, doc.data() as ClubModal));
  },
  // getEnrollmentByLectures: async (lecturesId: DocumentReference[]) => {
  //   const promises = lecturesId.map(async (lecture) => {
  //     const q = query(collection(firebaseDB, "lecture"), where(documentId(), "==", lecture));
  //     return (await getDocs(q)).docs.map((doc) => lectureConvert(doc.id, doc.data() as LectureModal));
  //   });
  //   return Promise.all(promises).then();
  // },
  // getEnrollmentByLecture: async (lectureId: string) => {
  //   const lectureRef = doc(firebaseDB, "lecture", lectureId);
  //   const q = query(clubCollection, where("lecture_id", "==", lectureRef));
  //   return (await getDocs(q)).docs.map((doc) => enrollmentConvert(doc.id, doc.data() as EnrollmentModal));
  // },
  // updateEnrollment: async (payload: { enrollmentId: string; current_step: number; stage: number }) => {
  //   const { enrollmentId, ...restPayload } = payload;
  //   console.log(payload);
  //   const enrollRef = doc(firebaseDB, club, enrollmentId);
  //   await updateDoc(enrollRef, restPayload);
  // },
};

export default ClubController;
