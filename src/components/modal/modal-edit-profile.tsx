import { Language, NATIONAL } from "@/core/type";
import { Box, Button, CircularProgress, InputBase, MenuItem, Select, TextField, Typography } from "@mui/material";
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
    return (
      !userProfile.nickName ||
      userProfile.nickName.trim().length === 0 ||
      userProfile.nickName.trim().length > 40 ||
      (userProfile.nickName === nickName && userProfile.nativeLanguage === nativeLanguage)
    );
  }, [userProfile]);

  const handleEditProfile = async () => {
    userProfile.nickName = userProfile.nickName.trim();
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
        <div>
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
              <TextField
                name="nickName"
                onChange={handleChangeInfo}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isDisable) {
                    handleEditProfile();
                  }
                }}
                value={userProfile.nickName}
                placeholder="Your full name"
                error={userProfile.nickName.length > 40}
                helperText={userProfile.nickName.length > 40 && "Full name character limit – 40 characters"}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "1px solid #DFE4EA",
                    },
                    "&:hover fieldset": {
                      borderWidth: "1px",
                    },
                    "&.Mui-focused fieldset": {},
                  },
                }}
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
                className="text-left"
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
            }}
          >
            <Button
              sx={{ borderRadius: "20px" }}
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
