import RecordController from "../controllers/record.controller";
import { RecordRequest } from "@/core/request";

const RecordService = {
  addRecord: async (payload: RecordRequest) => {
    return RecordController.addRecord(payload);
  },
  updateRecord: async (id: string, payload: RecordRequest) => {
    return RecordController.updateRecord(id, payload);
  },
  removeRecord: async (id: string) => {
    return RecordController.removeRecord(id);
  },
};

export default RecordService;
