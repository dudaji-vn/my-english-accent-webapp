import { firebaseDB } from "@/config/firebase";
import { DocumentReference, addDoc, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ClubModal, ClubRequest, LectureModal } from "../type";
import { clubConvert } from "../coverter/club.mapping";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";

const clubPath = "club";
const clubCollection = collection(firebaseDB, clubPath);

const ClubController = {
  getClubByUserId: async (userId: string, key: "owner_user_id" | "members") => {
    const userRef = doc(firebaseDB, "user", userId);
    let q = query(clubCollection, where(key, "==", userRef));
    if (key === "members") {
      q = query(clubCollection, where(key, "array-contains", userRef));
    }
    return (await getDocs(q)).docs.map((doc) => clubConvert(doc.id, doc.data() as ClubModal));
  },
  updateClub: async (payload: ClubRequest) => {
    const { clubName, lectures, ownerUserId, members, clubId } = payload;
    if (clubName && lectures && ownerUserId && clubId) {
      const userRef = doc(firebaseDB, "user", ownerUserId);
      const lecturesRef = lectures.map((id) => doc(firebaseDB, "lecture", id));
      const request = addTimeStamp({
        owner_user_id: userRef,
        lectures: lecturesRef,
        club_name: clubName,
        description: "",
        members: [],
      });
      return await setDoc(doc(clubCollection, clubId), request);
    } else if (members && clubId) {
      const usersRef = members.map((id) => doc(firebaseDB, "user", id));
      return await setDoc(
        doc(clubCollection, clubId),
        {
          members: usersRef,
        },
        {
          merge: true,
        }
      );
    }
  },
  getMembers: async (clubId: string) => {
    const q = query(clubCollection, where(documentId(), "==", clubId));
    return (await getDocs(q)).docs.map((doc) => clubConvert(doc.id, doc.data() as ClubModal));
  },
};

export default ClubController;
