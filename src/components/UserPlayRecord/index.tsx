import MessageIcon from "@/assets/icon/message-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import NationalityCard from "@/components/PersonInfo";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { saveAudio } from "@/core/store/index";
import { Language, RecordTypeResponse, UserResponseType } from "@/core/type";
import { Avatar, Box, Radio, Typography } from "@mui/material";
import { Fragment, MutableRefObject, useEffect, useState } from "react";

interface UserPlayRecordProps {
  props: (UserResponseType & RecordTypeResponse)[];
  audioElement: MutableRefObject<HTMLAudioElement | null>;
}

export default function UserPlayRecord({ props, audioElement }: UserPlayRecordProps) {
  let recordId: string = useAppSelector((state) => state.GlobalStore.clubPage.recordId);
  let isPlayAll: boolean = useAppSelector((state) => state.GlobalStore.clubPage.isPlayAll ?? false);
  let audioIndex: number = useAppSelector((state) => state.GlobalStore.clubPage.audioIndex);
  const voiceSrc = useAppSelector((state) => state.GlobalStore.clubPage.voiceSrc);

  const dispatch = useAppDispatch();
  const [isPlaying, setIsPlaying] = useState(false);

  const language = (language: Language) => {
    const lang = {
      vn: "Vietnamese",
      us: "English",
      kr: "Korean",
    };
    return lang[language];
  };

  const onHanlePlayAudio = (voiceSrc: string, recordId: string) => {
    dispatch(
      saveAudio({
        recordId,
        voiceSrc,
      })
    );
    setIsPlaying(() => true);
  };

  useEffect(() => {
    if (audioElement.current) {
      if (isPlaying && recordId) {
        audioElement.current.src = voiceSrc;
        audioElement.current.play().catch((error) => console.log(error));
      } else if (!isPlaying && recordId) {
        audioElement.current.pause();
      }
    }
  }, [isPlaying, recordId]);

  const onHandlePlayAllAudio = () => {
    if (isPlayAll) {
      onHanlePlayAudio(props[audioIndex].voiceSrc, props[audioIndex].recordId);
    }
  };

  useEffect(() => {
    onHandlePlayAllAudio();
  }, [isPlayAll, audioIndex]);

  return (
    <Box>
      {props &&
        props.map((record) => (
          <Fragment key={record.recordId}>
            <Box className='flex justify-between items-start py-4'>
              <Box>
                <NationalityCard isShowAvatar isShowName userInfo={record} />
                <Typography className='text-extra-small-regular flex gap-1 mt-2'>
                  <Avatar src={MessageIcon} component={"span"} className='w-4 h-4' />
                  Speak {language(record.nativeLanguage)} (native), {language(record.displayLanguage)}
                </Typography>
              </Box>
              <Radio
                onClick={() => onHanlePlayAudio(record.voiceSrc, record.recordId)}
                checked={recordId === record.recordId}
                value={record.recordId}
                icon={<Avatar src={SpeakerIcon} className='w-6 h-6' />}
                checkedIcon={<Avatar src={SpeakerFillIcon} className='w-6 h-6' />}
              />
            </Box>
          </Fragment>
        ))}
    </Box>
  );
}
