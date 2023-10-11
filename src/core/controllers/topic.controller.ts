import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
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
    const topicsResult: any[] = [];
    const querySnapshot = await getDocs(topicCollection);
    querySnapshot.forEach((doc) => {
      topicsResult.push({
        ...doc.data(),
        topicId: doc.id,
      });
    });
    return topicsResult;
  },
};

export default TopicController;
