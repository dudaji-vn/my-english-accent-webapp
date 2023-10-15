import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { TopicRequest } from "@/core/request";
import addTimeStamp from "@/shared/utils/addTimeStamp.util";

const topicPath = "topic";
const topicCollection = collection(firebaseDB, topicPath);

const TopicController = {
  addTopic: async (payload: TopicRequest) => {
    const request = addTimeStamp(payload);
    await setDoc(doc(topicCollection, "topic_" + nanoid()), request);
  },
  updateTopic: async (id: string, payload: TopicRequest) => {
    await setDoc(doc(topicCollection, id), payload);
  },
  removeTopic: async (id: string) => {
    await deleteDoc(doc(topicCollection, id));
  },
  getTopics: async () => {
    return (await getDocs(topicCollection)).docs.map((doc) => ({
      topicId: doc.id,
      imgSrc: doc.data().imgSrc,
      name: doc.data().name,
      created: doc.data().created,
      updated: doc.data().updated,
    }));
  },
  getTopicById: async (topicId: string) => {
    const q = query(topicCollection, where(documentId(), "==", topicId));
    const response = (await getDocs(q)).docs.map((doc) => ({
      topicId: doc.id,
      imgSrc: doc.data().imgSrc,
      name: doc.data().name,
      created: doc.data().created,
      updated: doc.data().updated,
    }));
    return response[0];
  },
};

export default TopicController;
