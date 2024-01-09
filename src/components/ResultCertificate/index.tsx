import StarIcon from "@/assets/icon/star-icon.svg";
import StartActiveIcon from "@/assets/icon/start-color-icon.svg";
import ROUTER from "@/shared/const/router.const";
import { Avatar, Box, Button, Theme, Typography, useMediaQuery } from "@mui/material";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "../icons/dowload-icon";
import LogoCertificateIcon from "../icons/logo-certificate-icon";
import ShareIcon from "../icons/share-icon";
import UndoIcon from "../icons/undo-icon";

interface IModalCompleteCertificateProps {}
const ResultCertificate = (props: IModalCompleteCertificateProps) => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const handleDownloadCertificate = () => {
    const input = document.getElementById("download-certificate");
    if (!input) {
      return;
    }
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a5");
      const pdfWidth = 148;
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "png", 0, 10, imgWidth, imgHeight);
      pdf.save("download.pdf");
    });
  };
  const handleGotoSharePage = () => {
    navigate(`${ROUTER.CERTIFICATE_USER}/linh?cer-name=123`);
  };
  return (
    <Box className="flex mt-6 items-center justify-center">
      <Box
        sx={{
          width: "640px",
          maxWidth: "calc(100% - 32px)",
        }}
        className="mb-5 shadow-[0_1px_3px_0px_#A6AFC366] bg-white rounded-2xl max-w-[calc(100% - 32px)] flex flex-col items-center justify-center"
      >
        <div id="download-certificate" className="pt-6 px-6 flex flex-col items-center mb-6">
          <LogoCertificateIcon />

          <Box className="flex gap-5 mt-4 mb-3">
            {[1, 2, 3, 4].map((star) => {
              return <Avatar className="w-5 h-5" variant="square" src={3 < star ? StarIcon : StartActiveIcon} />;
            })}
          </Box>
          <Typography className="uppercase text-3xl font-semibold mb-6">Level 2</Typography>
          <Box className="p-6 w-full flex flex-col items-center">
            <Typography className="font-medium">Proudly presented to</Typography>
            <Typography className="tracking-wide text-secondary uppercase text-3xl md:text-5xl !leading-[1.1] font-semibold pt-6 pb-4 text-center">
              TRƯƠNG NGUYỄN BẢO NGỌC HÀ
            </Typography>
            <Typography className="mb-4">For successfully completed recording TechTalk’s lecture</Typography>
            <Typography className="text-sm ">8, Jan 2024</Typography>
          </Box>
        </div>

        <Box className="p-6  border-solid border-0 border-t  border-t-stroke gap-1 flex flex-col md:flex-row w-full items-center justify-center md:justify-between ">
          <Button startIcon={<UndoIcon />} className="text-base font-semibold" color="primary">
            Test again
          </Button>
          <Button
            onClick={handleDownloadCertificate}
            startIcon={<DownloadIcon />}
            className=" text-base font-semibold"
            color="primary"
          >
            Download
          </Button>
          <Button
            onClick={handleGotoSharePage}
            fullWidth={isSmallScreen}
            startIcon={<ShareIcon />}
            className="px-8 rounded-2xl text-base font-semibold"
            variant="contained"
            color="primary"
          >
            Share
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResultCertificate;
