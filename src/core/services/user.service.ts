import UserController from "@/core/controllers/user.controller";

const UserService = {
  login: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    return UserController.login({ userName, password });
  },
  register: async ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    return UserController.register({ userName, password });
  },
};

export default UserService;
