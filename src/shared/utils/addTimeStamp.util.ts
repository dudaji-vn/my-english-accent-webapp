import { serverTimestamp } from "firebase/firestore";

const addTimeStamp = (object: Object) => {
  return Object.assign(object, {
    created: serverTimestamp(),
    updated: serverTimestamp(),
  });
};

export default addTimeStamp;
