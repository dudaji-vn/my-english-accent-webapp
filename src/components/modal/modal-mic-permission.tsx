import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

import { Link } from "react-router-dom";

interface IModalMicPermissionProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export default function ModalMicPermission({ isOpen, onConfirm }: IModalMicPermissionProps) {
  const [isShow, setIsShow] = useState(() => isOpen);

  return (
    <Modal open={isShow} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          maxWidth: "90%",
          background: "#FFF",
          borderRadius: 2,
          p: 4,
          gap: "22px",
          display: "flex",
          flexDirection: "column",
          outline: "none",
        }}
      >
        <Typography className="text-extra-large-semibold">Need permission to use microphone!</Typography>
        <Typography mt={1}>Please setup a working microphone and allow permissions to use it in your browser.</Typography>
        <Link
          className="text-sm text-secondary font-semibold"
          to={"https://support.google.com/chrome/answer/2693767"}
          target="_blank"
        >
          Learn more
        </Link>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            sx={{
              borderRadius: "20px",
            }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => {
              setIsShow(false);
              onConfirm && onConfirm();
            }}
          >
            Ok, I got it
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
