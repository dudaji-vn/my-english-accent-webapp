import { firebaseStorage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const audioPath = "audio";
const UploadFileController = {
  uploadAudio: async (mediaFile: File, vocabularyId: string, myId: string, isClub?: boolean) => {
    const storageRef = ref(firebaseStorage, `${audioPath}/${isClub ? "club" : "nonclub"}/${vocabularyId}/${myId}`);
    const fileRef = await uploadBytes(storageRef, mediaFile).then((r) => r.ref);
    return getDownloadURL(fileRef)
      .then((downloadURL) => downloadURL)
      .catch((error) => error);
  },
};
export default UploadFileController;
