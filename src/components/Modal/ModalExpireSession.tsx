import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { toggleModal } from "@/core/store/index";

interface Props {
  isOpen: boolean;
}

export default function ModalExpireSession({ isOpen }: Props) {
  const [isShow, setIsShow] = useState(() => isOpen);
  const dispatch = useDispatch();
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
        <Typography className="text-extra-large-semibold">Session Expired!</Typography>
        <Typography mt={1}>Your session has expired due to inactivity.</Typography>
        <Box display={"flex"} justifyContent={"center"}>
          <Button
            sx={{
              borderRadius: "20px",
            }}
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => {
              dispatch(toggleModal());
              setIsShow(false);
            }}
          >
            Ok, I got it
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
