import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { ChangeEvent, createRef, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import Modal, { IModalProps } from ".";
import UploadIcon from "../icons/upload-icon";
import { convertBase64toFile } from "@/shared/utils/file";
import UploadFileController from "@/core/controllers/uploadFile.controller";
import { useUpdateProfileMutation } from "@/core/services";
import useSnackbar from "@/shared/hook/use-snack-bar";
import persist from "@/shared/utils/persist.util";
import CloseIcon from "../icons/close-icon";

interface IModalAvatarProps extends IModalProps {
  onConfirm?: () => void;
}

const ModalAvatar = (props: IModalAvatarProps) => {
  const { open, onClose } = props;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const cropperRef = createRef<ReactCropperElement>();
  const { SnackbarComponent, showSnackbar } = useSnackbar();
  const [image, setImage] = useState<string | null>();
  const [trigger, { isLoading }] = useUpdateProfileMutation();

  const handleUpdateImage = async () => {
    if (!cropperRef.current || !cropperRef.current.cropper) {
      return;
    }
    const base64File = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
    const file = await convertBase64toFile(base64File, "text.png");
    const url = await UploadFileController.uploadImage(file);
    const data = await trigger({
      avatarUrl: url,
    }).unwrap();

    if (data) {
      console.log(data);
      persist.updateProfile(data);
      setTimeout(() => {
        window.location.reload();
      }, 1000);

      showSnackbar("Your avatar has been changed successfully");
    }

    onClose && onClose();
  };

  const handleOpenFile = () => {
    inputFileRef.current?.click();
  };
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      return;
    }

    setImage(URL.createObjectURL(file));
  };

  return (
    <>
      <SnackbarComponent />
      <Modal open={open}>
        <div className={false ? "pointer-events-none cursor-not-allowed" : ""}>
          <div className="flex gap-4 justify-between mt-4 mb-8">
            <Typography className="font-semibold text-xl text-left">Upload avatar</Typography>
            <Box
              onClick={() => {
                setImage(null);
                onClose && onClose();
              }}
              className="p-0"
            >
              <CloseIcon />
            </Box>
          </div>

          <Box
            onClick={() => !image && handleOpenFile()}
            sx={{
              padding: "32px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              minHeight: 200,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <Box>
              <input
                onChange={handleChangeFile}
                ref={inputFileRef}
                accept="image/png, image/gif, image/jpeg"
                className="hidden"
                type="file"
                name=""
              />
              <div>
                {image ? (
                  <Cropper
                    className="max-h-[300px] md:max-h-[350px]"
                    ref={cropperRef}
                    style={{ height: 350, width: "100%" }}
                    zoomTo={0.5}
                    aspectRatio={1}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false}
                    guides={true}
                  />
                ) : (
                  <div className="border rounded-lg w-fit border-gray50 p-2">
                    <UploadIcon />
                    <Typography className="mb-2">Upload Image</Typography>
                  </div>
                )}
              </div>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: "20px",
              gap: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              fullWidth
              className="rounded-[20px] py-[10px] flex gap-4"
              disabled={!image}
              onClick={handleUpdateImage}
              variant="contained"
            >
              {isLoading && <CircularProgress size={24} sx={{ color: "#fff" }} />}
              Save
            </Button>
          </Box>
        </div>
      </Modal>
    </>
  );
};

export default ModalAvatar;
