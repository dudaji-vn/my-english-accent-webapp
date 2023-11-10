import { Box, Typography, Avatar, Radio } from "@mui/material";
import MessageIcon from "@/assets/icon/message-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import NationalityCard from "@/components/NationalityCard";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import { useEffect, useRef, useState } from "react";

interface UserPlayRecordProps {
  props: UserResponseType & RecordTypeResponse;
  audioSelected: string;
  setAudioSelected: Function;
  currentVocabulary: number;
}

export default function UserPlayRecord({ props, audioSelected, setAudioSelected, currentVocabulary }: UserPlayRecordProps) {
  const audioRef = useRef(new Audio());
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
    audioRef.current.src = value;
    setIsPlaying(() => true);
  };

  useEffect(() => {
    if (audioRef.current) {
      console.log("UserPlayRecord::useEffect::playing", isPlaying);
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      console.log("UserPlayRecord::useEffect::currentVocabulary", currentVocabulary);
      setIsPlaying(() => false);
    }
  }, [currentVocabulary]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        console.log("UserPlayRecord::useEffect::addEventListener");
        setIsPlaying(() => false);
      });
    }
    return () => {
      console.log("UserPlayRecord::useEffect::removeEventListener");
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(() => false);
        });
      }
    };
  }, []);

  console.log("UserPlayRecord::audioSelected::", audioSelected);
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
        disabled={isPlaying}
      />
    </Box>
  );
}
