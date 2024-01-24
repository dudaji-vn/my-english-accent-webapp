import { Language, NATIONAL } from "@/core/type";
import { Box, Button, CircularProgress, InputBase, MenuItem, Select, Typography } from "@mui/material";
import Modal, { IModalProps } from ".";
import CloseIcon from "../icons/close-icon";
import { ChangeEvent, useMemo, useState } from "react";
import persist from "@/shared/utils/persist.util";
import { useUpdateProfileMutation } from "@/core/services";
import useSnackbar from "@/shared/hook/use-snack-bar";

interface IModalEditProfileProps extends IModalProps {
  onConfirm?: () => void;
}

const ModalEditProfile = (props: IModalEditProfileProps) => {
  const { open, onClose } = props;
  const { SnackbarComponent, showSnackbar } = useSnackbar();
  const { nickName, nativeLanguage } = persist.getMyInfo();

  const [trigger, { isLoading }] = useUpdateProfileMutation();
  const [userProfile, setUserProfile] = useState({
    nickName: nickName,
    nativeLanguage: nativeLanguage,
  });

  const isDisable = useMemo(() => {
    return userProfile.nickName === nickName && userProfile.nativeLanguage === nativeLanguage;
  }, [userProfile]);

  const handleEditProfile = async () => {
    console.log(userProfile);
    const data = await trigger(userProfile).unwrap();
    if (data) {
      persist.updateProfile(data);
      setTimeout(() => {
        window.location.reload();
      }, 500);

      showSnackbar("Your profile has been changed successfully");
    }

    onClose && onClose();
  };
  const handleChangeInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserProfile((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <SnackbarComponent />
      <Modal open={open} onClose={onClose}>
        <div className={false ? "pointer-events-none cursor-not-allowed" : ""}>
          <div className="flex gap-4 justify-between my-4">
            <Typography className="font-semibold text-xl text-left">Edit profile</Typography>
            <Box onClick={onClose} className="p-0">
              <CloseIcon />
            </Box>
          </div>
          <Box
            sx={{
              borderRadius: "10px",
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <Box className="flex flex-col w-full mb-4">
              <Typography className="text-left mb-2">Full name</Typography>
              <InputBase
                name="nickName"
                onChange={handleChangeInfo}
                className="hover:border-primary px-5 py-3 border border-stroke border-solid rounded-md bg-white text-base-regular"
                value={userProfile.nickName}
                placeholder="Your full name"
              />
            </Box>
            <Box>
              <Typography className="text-left mb-2">Native language</Typography>
              <Select
                name="nativeLanguage"
                onChange={handleChangeInfo as any}
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #DFE4EA",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #7F56D9",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #DFE4EA",
                  },
                  ".MuiSvgIcon-root ": {},
                }}
                className="text-left "
                fullWidth
                value={userProfile.nativeLanguage}
              >
                {Object.keys(NATIONAL).map((item) => {
                  return <MenuItem value={item}>{NATIONAL[item as Language]}</MenuItem>;
                })}
              </Select>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
            }}
          >
            <Button
              disabled={isDisable || isLoading}
              className="py-[10px] flex gap-4"
              fullWidth
              onClick={handleEditProfile}
              variant="contained"
            >
              {isLoading && <CircularProgress sx={{ color: "#fff" }} size={24} />}
              Save changes
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default ModalEditProfile;
