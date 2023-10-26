import { Box, Typography, Avatar, Radio } from "@mui/material";
import MessageIcon from "@/assets/icon/message-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import NationalityCard from "@/components/NationalityCard";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import { useEffect, useState } from "react";

interface UserPlayRecordProps {
  props: UserResponseType & RecordTypeResponse;
  audioSelected: string;
  setAudioSelected: Function;
  currentVocabulary: number;
}

export default function UserPlayRecord({ props, audioSelected, setAudioSelected, currentVocabulary }: UserPlayRecordProps) {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const language = (language: string) => {
    if (language === "vi") {
      return "Vietnamese";
    } else if (language === "en") {
      return "English";
    } else if (language === "kr") {
      return "Korea";
    } else {
      return "";
    }
  };

  const onHanlePlayAudio = async (value: string) => {
    setAudioSelected(value);
    const newAudio = new Audio(value);
    setAudio(() => newAudio);
    setIsPlaying(() => true);
  };

  useEffect(() => {
    if (audio) {
      console.log("audio::", audio.src);
      isPlaying ? audio.play() : audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audio && isPlaying) {
      console.log("STOP:::");
      setIsPlaying(() => false);
    }
  }, [currentVocabulary]);

  useEffect(() => {
    if (audio) {
      audio.onended = function () {
        setIsPlaying(() => false);
      };
    }
  });

  return (
    <Box className='flex justify-between items-start py-4'>
      <Box>
        <NationalityCard isShowAvatar isShowName isShowNationality userInfo={props} />
        <Typography className='text-extra-small-regular flex gap-1 mt-2'>
          <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
          Speak {language(props.nativeLanguage)} (native), {language(props.displayLanguage)}
        </Typography>
      </Box>
      <Radio
        onChange={() => onHanlePlayAudio(props.rVoiceSrc)}
        checked={audioSelected === props.rVoiceSrc}
        value={props.rVoiceSrc}
        icon={<Avatar src={SpeakerIcon} className='w-6 h-6' />}
        checkedIcon={<Avatar src={SpeakerFillIcon} className='w-6 h-6' />}
        disabled={isPlaying}
      />
    </Box>
  );
}
