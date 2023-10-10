import firebaseDB from "@/config/firebase";
import { nanoid } from "@reduxjs/toolkit";
import {
  FieldPath,
  addDoc,
  and,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const LessonCategoryPath = "lessonCategory";
const LessonCategoryCollection = collection(firebaseDB, LessonCategoryPath);

const LessonCategoryController = {
  addLesson: async (payload: any) => {
    const docRef = await addDoc(LessonCategoryCollection, payload);
    console.log("Document written with ID: ", docRef.id);
  },
  updateLesson: async (payload: any) => {
    // const docRef = await setDoc(LessonCategoryCollection, payload);
    // console.log("Document written with ID: ", docRef.id);
  },
};

export default LessonCategoryController;
