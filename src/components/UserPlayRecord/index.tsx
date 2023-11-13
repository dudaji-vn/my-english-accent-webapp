import { Box, Typography, Avatar, Radio } from "@mui/material";
import MessageIcon from "@/assets/icon/message-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import NationalityCard from "@/components/NationalityCard";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { saveAudio } from "@/core/store/index";
import { useEffect } from "react";

interface UserPlayRecordProps {
  props: UserResponseType & RecordTypeResponse;
  audioSelected: string;
}

export default function UserPlayRecord({ props, audioSelected }: UserPlayRecordProps) {
  const audio: HTMLAudioElement = useAppSelector((state) => state.GlobalStore.clubPage.audio);
  const dispatch = useAppDispatch();

  const language = (language: string) => {
    if (language === "vn") {
      return "Vietnamese";
    } else if (language === "us") {
      return "English";
    } else if (language === "kr") {
      return "Korea";
    } else {
      return "";
    }
  };

  const onHanlePlayAudio = (value: string) => {
    dispatch(saveAudio(value));
    if (audio.paused) {
      audio.play().catch((error) => {
        console.log("error occurred::", error);
      });
    }
  };

  useEffect(() => {
    dispatch(saveAudio(audioSelected));
  }, [audioSelected]);

  return (
    <Box className='flex justify-between items-start py-4'>
      <Box>
        <NationalityCard isShowAvatar isShowName userInfo={props} />
        <Typography className='text-extra-small-regular flex gap-1 mt-2'>
          <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
          Speak {language(props.nativeLanguage)} (native), {language(props.displayLanguage)}
        </Typography>
      </Box>
      <Radio
        onChange={() => onHanlePlayAudio(props.voiceSrc)}
        checked={audioSelected === props.voiceSrc}
        value={props.voiceSrc}
        icon={<Avatar src={SpeakerIcon} className='w-6 h-6' />}
        checkedIcon={<Avatar src={SpeakerFillIcon} className='w-6 h-6' />}
      />
    </Box>
  );
}
