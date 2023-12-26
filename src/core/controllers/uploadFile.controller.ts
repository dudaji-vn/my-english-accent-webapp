import axios from "axios";
import { CLOUDINARY_CONFIG } from "../../shared/const/cloudinary";

export interface ICloudinaryResponse {
  url: string;
  type: string;
}
const UploadFileController = {
  // uploadAudio: async (mediaFile: File, vocabularyId: string, myId: string, isClub?: boolean) => {
  //   const storageRef = ref(firebaseStorage, `${audioPath}/${isClub ? "club" : "nonclub"}/${vocabularyId}/${myId}`);
  //   const fileRef = await uploadBytes(storageRef, mediaFile).then((r) => r.ref);
  //   return getDownloadURL(fileRef)‚
  //     .then((downloadURL) => downloadURL)
  //     .catch((error) => error);
  // },
  uploadAudio: async (mediaFile: File, vocabularyId: string, myId: string, isClub?: boolean) => {
    const { cloudName, cloudiaryUrl, uploadPreset } = CLOUDINARY_CONFIG;
    const formData = new FormData();
    formData.append(`file`, mediaFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("cloud_name", cloudName);
    try {
      let res = await axios.post<ICloudinaryResponse>(cloudiaryUrl, formData);
      console.log(res.data);
      return res.data.url;
    } catch (err) {
      console.log(err);
      return "";
    }
  },
};
export default UploadFileController;
