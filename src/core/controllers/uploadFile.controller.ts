import { firebaseStorage } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const audioPath = "audio";

const UploadFileController = {
  uploadAudio: (audiofile: File, vocabularyId: string, myId: string, callback: Function) => {
    const storageRef = ref(firebaseStorage, `${audioPath}/${vocabularyId}/${myId}`);
    const uploadTask = uploadBytesResumable(storageRef, audiofile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.info("uploading::", progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback({
            clubStudyId: null,
            userId: myId,
            vocabularyId: vocabularyId,
            voiceSrc: downloadURL,
          });
        });
      }
    );
  },
};

export default UploadFileController;