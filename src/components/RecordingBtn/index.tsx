import { useState } from "react";
import { Box, IconButton, Avatar, Typography, Container } from "@mui/material";
import MicrophoneIcon from "@/assets/icon/microphone-outline-icon.svg";
import SoundIcon from "@/assets/icon/sound-icon.svg";
import HearingIcon from "@/assets/icon/hearing-icon.svg";
import ArrowRight from "@/assets/icon/arrow-right-color-icon.svg";
import { useNavigate, useParams } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";

export default function RecordingBtn() {
  const navigate = useNavigate();
  const params = useParams();

  const [isRecord, setIsRecord] = useState(false);

  const [saveRecord, setSaveRecord] = useState(true);

  const getConditionShowBtn = () => {
    return isRecord ? false : !!saveRecord;
  };

  const gotoRecordSummaryPage = () => {
    const path = `/${params.category}`;
    navigate({
      pathname: ROUTER.RECORD + path + ROUTER.SUMMARY,
    });
  };

  const onRecord = () => {
    console.log("record");
    setIsRecord(() => !isRecord);
  };
  return (
    <Box className="text-center">
      <Box
        className={`flex items-center p-7 ${
          getConditionShowBtn() ? "justify-between" : "justify-center"
        }`}
      >
        {getConditionShowBtn() && (
          <IconButton
            onClick={onRecord}
            className="border border-stroke border-solid"
          >
            <Avatar src={HearingIcon} className="w-6 h-6" />
          </IconButton>
        )}

        <IconButton className="bg-primary p-5" onClick={onRecord}>
          <Avatar src={isRecord ? SoundIcon : MicrophoneIcon} />
        </IconButton>
        {getConditionShowBtn() && (
          <IconButton
            onClick={() => gotoRecordSummaryPage()}
            className="border border-stroke border-solid"
          >
            <Avatar src={ArrowRight} className="w-6 h-6" />
          </IconButton>
        )}
      </Box>
      <Typography variant="body2" className="text-small-regular mt-4">
        {isRecord ? "Speak now" : "Tap the icon above and record your voice"}
      </Typography>
    </Box>
  );
}
