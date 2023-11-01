import { UserModal, UserResponseType } from "../type";

export const userConvert = (id: string, user: UserModal): UserResponseType => {
  return {
    avatarUrl: user.avatar_url,
    favoriteUserIds: user.favorite_user_ids,
    googleId: user.google_id,
    nativeLanguage: user.native_language,
    nickName: user.nick_name,
    userName: user.user_name,
    userId: id,
    displayLanguage: user.display_language,
    created: new Date(),
    email: "",
    updated: new Date(),
  };
};
