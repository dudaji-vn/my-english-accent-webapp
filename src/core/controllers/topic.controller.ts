import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, documentId, getDocs, query, setDoc, where } from "firebase/firestore";
import { ITopicRequest } from "@/core/type";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";

const topicPath = "lecture";
const topicCollection = collection(firebaseDB, topicPath);

const TopicController = {
  addTopic: (payload: ITopicRequest) => {
    const request = addTimeStamp(payload);
    setDoc(doc(topicCollection, "lectureId_" + nanoid()), request);
  },

  updateTopic: async (id: string, payload: ITopicRequest) => {
    await setDoc(doc(topicCollection, id), payload);
  },

  removeTopic: async (id: string) => {
    await deleteDoc(doc(topicCollection, id));
  },

  getTopics: async () => {
    return (await getDocs(topicCollection)).docs.map((doc) => ({
      lectureId: doc.id,
      imgSrc: doc.data().img_src,
      lectureName: doc.data().lecture_name,
      created: doc.data().created,
      updated: doc.data().updated,
    }));
  },
  getTopicById: async (lectureId: string) => {
    const q = query(topicCollection, where(documentId(), "==", lectureId));
    const response = (await getDocs(q)).docs.map((doc) => ({
      lectureId: doc.id,
      imgSrc: doc.data().img_src,
      lectureName: doc.data().lecture_name,
      created: doc.data().created,
      updated: doc.data().updated,
    }));
    return response[0];
  },
};

export default TopicController;
