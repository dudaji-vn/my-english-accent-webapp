import Box from "@mui/material/Box";
import { Modal as ModalLib } from "@mui/material";
import React, { ReactNode } from "react";

export interface IModalProps {
  open: boolean;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
  modalStyle?: any;
}

const Modal: React.FC<IModalProps> = ({ open, onClose, children, modalStyle, className }) => {
  const defaultModalStyle = {
    "&:focus": {
      outline: "none",
    },
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    maxWidth: "calc(100% - 32px)",
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    textAlign: "center",
    gap: "32px",
    display: "flex",
    flexDirection: "column",
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingBottom: "24px",
  };
  return (
    <ModalLib onClose={onClose} open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={[defaultModalStyle, modalStyle]}>{children}</Box>
    </ModalLib>
  );
};

export default Modal;
