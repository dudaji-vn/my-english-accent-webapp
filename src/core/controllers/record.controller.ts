import { RecordRequest } from "@/core/type";

const recordPath = "record";

const RecordController = {
  addOrUpdateRecord: (payload: RecordRequest) => {
    return {
      url: `/${recordPath}/addOrUpdateRecord`,
      method: "PUT",
      body: payload,
    };
  },

  getMyRecordsByLecture: (lectureId: string) => {
    return {
      url: `/${recordPath}/getMyRecordsByLecture`,
      params: { lectureId },
    };
  },
};

export default RecordController;
