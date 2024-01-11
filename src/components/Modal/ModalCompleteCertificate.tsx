import Modal from ".";
import { Avatar, Box, Button, Typography } from "@mui/material";
import MedalActiveIcon from "@/assets/icon/medal-color-icon.svg";
import StarIcon from "@/assets/icon/star-icon.svg";
import StartActiveIcon from "@/assets/icon/start-color-icon.svg";
interface IModalCompleteCertificateProps {
  start: number;
  percent: number;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}
const ModalCompleteCertificate = (props: IModalCompleteCertificateProps) => {
  console.log({ per: props.percent });
  const { open, onClose, onConfirm, percent } = props;
  return (
    <Modal onClose={onClose} open={open}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Avatar
          sx={{
            width: "100px",
            height: "100px",
            marginBottom: "28px",
          }}
          src={MedalActiveIcon}
          variant="square"
          alt="gallery-icon"
        />
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          {[1, 2, 3, 4].map((star) => {
            return (
              <Avatar
                key={star}
                sx={{
                  width: 20,
                  height: 20,
                }}
                variant="square"
                src={props.start < star ? StarIcon : StartActiveIcon}
              />
            );
          })}
        </Box>
        <Typography sx={{ marginBottom: "16px", fontSize: "20px", fontWeight: 600 }}>Highest result: {percent * 100}%</Typography>
        <Typography
          sx={{
            marginBottom: "40px",
          }}
        >
          You have mastered 10 words and sentences. You can understand essential conversations and can already speak several
          important sentences in IT-English.
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
          Finish
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
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCompleteCertificate;
