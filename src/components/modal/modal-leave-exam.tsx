import Modal from ".";
import { Box, Button, Typography } from "@mui/material";

interface IModalCompleteCertificateProps {
  open: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}
const ModalLeaveExam = (props: IModalCompleteCertificateProps) => {
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
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          paddingTop: "24px",
        }}
      >
        <Typography sx={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>Leave IT-English test level ?</Typography>
        <Typography
          sx={{
            marginBottom: "40px",
          }}
        >
          You haven't completed the test, leave now all your progress will be lost.
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
          Leave now
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
          Stay
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalLeaveExam;
