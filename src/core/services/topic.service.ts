import TopicController from "../controllers/topic.controller";
import { TopicRequest } from "../request";

const TopicService = {
  addTopic: async (payload: TopicRequest) => {
    return TopicController.addTopic(payload);
  },
  updateTopic: async (id: string, payload: TopicRequest) => {
    return TopicController.updateTopic(id, payload);
  },
  removeTopic: async (id: string) => {
    return TopicController.removeTopic(id);
  },
};

export default TopicService;
