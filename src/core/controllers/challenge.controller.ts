import { firebaseDB } from "@/config/firebase";
import { DocumentReference, addDoc, collection, doc, documentId, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { ClubModal, ClubRequest, LectureModal } from "../type";
import { clubConvert } from "../coverter/club.mapping";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";
import { challengeConvert } from "../coverter/challenge.mapping";
import { ChallengeModal } from "../type/challenge.type";

const challengePath = "challenge";
const challengeCollection = collection(firebaseDB, challengePath);

const ChallengeController = {
  getChallengesInClub: async (clubId: string) => {
    const clubRef = doc(firebaseDB, "club", clubId);
    const q = query(challengeCollection, where("club_id", "==", clubRef));
    return (await getDocs(q)).docs.map((doc) => challengeConvert(doc.id, doc.data() as ChallengeModal));
  },
};

export default ChallengeController;
