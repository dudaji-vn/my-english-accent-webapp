import { firebaseDB } from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { TopicRequest } from "@/core/request";

const topicPath = "topic";
const topicCollection = collection(firebaseDB, topicPath);

const TopicController = {
  addTopic: async (payload: TopicRequest) => {
    await setDoc(doc(topicCollection, "topic_" + nanoid()), payload);
  },
  updateTopic: async (id: string, payload: TopicRequest) => {
    await setDoc(doc(topicCollection, id), payload);
  },
  removeTopic: async (id: string) => {
    await deleteDoc(doc(topicCollection, id));
  },
};

export default TopicController;
