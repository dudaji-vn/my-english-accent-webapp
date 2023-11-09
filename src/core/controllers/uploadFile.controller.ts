import { firebaseStorage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const audioPath = "audio";

const UploadFileController = {
  uploadAudio: async (mediaBlobUrl: string, vocabularyId: string, myId: string, isClub?: boolean) => {
    const audioBlob = await fetch(mediaBlobUrl as unknown as URL).then((r) => r.blob());
    const audiofile = new File([audioBlob], "audiofile.mp3", {
      type: "audio/mp3",
    });

    const storageRef = ref(firebaseStorage, `${audioPath}/${isClub ? "club" : "nonclub"}/${vocabularyId}/${myId}`);
    const fileRef = await uploadBytes(storageRef, audiofile).then((r) => r.ref);
    return getDownloadURL(fileRef)
      .then((downloadURL) => downloadURL)
      .catch((error) => error);
  },
};

export default UploadFileController;
