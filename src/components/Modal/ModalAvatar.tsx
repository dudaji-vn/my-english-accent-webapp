import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, createRef, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import Modal, { IModalProps } from ".";
import UploadIcon from "../icons/upload-icon";
import { convertBase64toFile } from "@/shared/utils/file";
import UploadFileController from "@/core/controllers/uploadFile.controller";

interface IModalAvatarProps extends IModalProps {
  onConfirm?: () => void;
}

const ModalAvatar = (props: IModalAvatarProps) => {
  const { open, onClose } = props;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const cropperRef = createRef<ReactCropperElement>();
  const [image, setImage] = useState<string>();

  const getCropData = async () => {
    if (!cropperRef.current || !cropperRef.current.cropper) {
      return;
    }
    const base64File = cropperRef.current.cropper.getCroppedCanvas().toDataURL();
    const file = await convertBase64toFile(base64File, "text.png");
    const url = await UploadFileController.uploadImage(file);
    return url;
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
    <Modal open={open}>
      <div className={false ? "pointer-events-none cursor-not-allowed" : ""}>
        <div className="flex gap-4 justify-between ">
          <Typography
            sx={{
              marginY: "16px",
              textAlign: "left",
              fontWeight: 600,
            }}
          >
            Change avatar
          </Typography>
        </div>
        <Box
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
          <Box onClick={() => !image && handleOpenFile()}>
            <input
              onChange={handleChangeFile}
              ref={inputFileRef}
              accept="image/png, image/gif, image/jpeg"
              style={{
                display: "none",
              }}
              className="hidden"
              type="file"
              name=""
            />
            <div>
              {image ? (
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "100%" }}
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
            onClick={() => {
              onClose && onClose();
            }}
          >
            Cancel
          </Button>
          <Button onClick={getCropData} variant="contained">
            Save
          </Button>
        </Box>
      </div>
    </Modal>
  );
};

export default ModalAvatar;
