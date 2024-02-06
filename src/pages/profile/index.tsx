import EditAvatarIcon from "@/components/icons/edit-avatar-icon";
import EditProfileIcon from "@/components/icons/edit-profile-icon";
import persist from "@/shared/utils/persist.util";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import ModalAvatar from "@/components/modal/modal-avatar";
import { useState } from "react";
import ModalEditProfile from "../../components/modal/modal-edit-profile";

const Profile = () => {
  const { avatarUrl, nickName, email } = persist.getMyInfo();
  const [isOpenModalAvatar, setIsOpenModalAvatar] = useState<boolean>(false);
  const [isOpenModalProfile, setIsOpenModalProfile] = useState<boolean>(false);

  return (
    <Box className="mt-12 flex flex-col items-center">
      <Box className="relative">
        <Avatar className="w-20 h-20 mb-4" alt="avatar-icon" src={avatarUrl} />
        <IconButton onClick={() => setIsOpenModalAvatar(true)} className="absolute right-0 bottom-0">
          <EditAvatarIcon />
        </IconButton>
        <ModalAvatar onClose={() => setIsOpenModalAvatar(false)} open={isOpenModalAvatar} />
        <ModalEditProfile onClose={() => setIsOpenModalProfile(false)} open={isOpenModalProfile} />
      </Box>

      <Typography className="text-lg font-medium mb-2">{nickName}</Typography>
      <Typography className="text-sm mb-6">{email}</Typography>
      <Button
        onClick={() => setIsOpenModalProfile(true)}
        variant="contained"
        className="px-4 py-[10px] rounded-3xl"
        startIcon={<EditProfileIcon />}
      >
        Edit profile
      </Button>
    </Box>
  );
};

export default Profile;
