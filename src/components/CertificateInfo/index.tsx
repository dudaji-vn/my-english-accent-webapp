import RewardIcon from "@/assets/icon/reward-icon.svg";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface ICertificateInfoProps {
  onConfirm: () => void;
}
const CertificateInfo = (props: ICertificateInfoProps) => {
  const { onConfirm } = props;
  const navigate = useNavigate();
  return (
    <Box className="flex flex-col items-center mt-6">
      <Box className="shadow-[0_1px_3px_0px_#A6AFC366] bg-white rounded-2xl max-w-[95%] md:max-w-[50%] lg:max-w-[35%]">
        <Box className="p-4 bg-yellow-400 flex items-center rounded-t-2xl gap-4">
          <Box className="rounded-full p-2 bg-white">
            <Avatar src={RewardIcon} />
          </Box>

          <Typography className="text-extra-large-bold  " color={"white"}>
            TechTalk Certificates
          </Typography>
        </Box>
        <Box className="p-6">
          <Box className="mt-4 mb-12">
            <Typography className="text-large-semibold mb-4">This is your spoken IT-English test level.</Typography>
            <Typography className="mb-1">
              1. The test have 10 words and sentences. To evaluate your spoken IT-English level, you are required to record in the
              test. Please make sure you are taking the test in a quiet environment.
            </Typography>
            <Typography className="mb-1">
              2. Your test result will be from 1 - 5 stars base on your performance. Correctly record 2 sentences will receive 2
              stars.
            </Typography>
            <Typography className="mb-1">
              3. To ensure the accuracy of the test result, please complete the test in one go, and remain focus during the test.
            </Typography>
          </Box>
          <Box className="flex flex-col">
            <Button onClick={onConfirm} className="mb-4" variant="contained" color="primary">
              Ok, I’m ready
            </Button>
            <Button onClick={() => navigate(-1)}>Test later</Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CertificateInfo;
