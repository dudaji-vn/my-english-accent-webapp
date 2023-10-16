import { firebaseStorage } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const audioPath = "audio";

const UploadFileController = {
<<<<<<< Updated upstream
  uploadAudio: (
    audiofile: any,
    topicId: string,
    vocabularyId: string,
    callback: any
  ) => {
    const storageRef = ref(
      firebaseStorage,
      `${audioPath}/${topicId}/${vocabularyId}/voice_${nanoid()}`
    );
=======
  uploadAudio: (audiofile: any, topicId: string, vocabularyId: string, callback: any) => {
    const storageRef = ref(firebaseStorage, `${audioPath}/${topicId}/${vocabularyId}/voice_${nanoid()}`);
>>>>>>> Stashed changes
    const uploadTask = uploadBytesResumable(storageRef, audiofile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
<<<<<<< Updated upstream
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
=======
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
>>>>>>> Stashed changes
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          callback({
            clubStudyId: null,
            userId: "idUser2JLpns9SQblwSgNigfTwF",
            vocabularyId: vocabularyId,
            voiceSrc: downloadURL,
          });
        });
      }
    );
  },
};

export default UploadFileController;
