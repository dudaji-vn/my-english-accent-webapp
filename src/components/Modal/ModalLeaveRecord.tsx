import Modal from ".";
import { Box, Button, Typography } from "@mui/material";

interface IModalCompleteCertificateProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}
const ModalLeaveRecord = (props: IModalCompleteCertificateProps) => {
  const { open, onClose, onConfirm } = props;
  return (
    <Modal
      modalStyle={{
        width: "360px",
      }}
      onClose={onClose}
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "24px",
        }}
      >
        <Typography sx={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600, textAlign: "left" }}>
          Are you sure you want to exit ?
        </Typography>
        <Typography
          sx={{
            marginBottom: "24px",
            textAlign: "left",
          }}
        >
          You will lose your current voice recording.
        </Typography>

        <Button
          onClick={onConfirm}
          sx={{
            borderRadius: "20px",
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
          fullWidth
          variant="contained"
          color="primary"
        >
          Go back
        </Button>
        <Button
          onClick={onClose}
          sx={{
            borderRadius: "20px",
            fontSize: "16px",
            fontWeight: 600,
          }}
          fullWidth
          color="primary"
        >
          Exit
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalLeaveRecord;
