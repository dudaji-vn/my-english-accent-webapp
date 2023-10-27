import { firebaseDB } from "@/config/firebase";
import { DocumentReference, Timestamp, addDoc, collection, doc, documentId, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
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
  getChallengeDetail: async (challengeId: string) => {
    const q = query(challengeCollection, where(documentId(), "==", challengeId));
    return (await getDocs(q)).docs.map((doc) => challengeConvert(doc.id, doc.data() as ChallengeModal))[0];
  },
  addChallenge: async (clubId: string) => {
    const clubRef = doc(firebaseDB, "club", clubId);

    const payload = {
      club_id: clubRef,
      challenge_name: "Word-guessing with colleagues",
      participants: [],
    };

    const request = addTimeStamp(payload);
    const challengeRef = await addDoc(challengeCollection, request);
    return challengeRef.id;
  },
  updateChallenge: async (challengeId: string, userId: string, participants: DocumentReference[]) => {
    const userRef = doc(firebaseDB, "user", userId);
    return await setDoc(
      doc(challengeCollection, challengeId),
      {
        participants: participants.concat(userRef),
      },
      {
        merge: true,
      }
    );
  },
};

export default ChallengeController;
