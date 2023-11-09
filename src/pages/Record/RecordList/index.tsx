import { Container, Box, IconButton, Avatar, Typography, Radio } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import { useGetAllVocabulariesInLectureQuery } from "@/core/services";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import CheckIcon from "@/assets/icon/check-icon.svg";

import { useEffect, useState } from "react";
export default function RecordSentenceList() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectionAudio, setSelectionAudio] = useState("");
  const { data } = useGetAllVocabulariesInLectureQuery(state.lectureId);

  const onHandleBack = () => {
    navigate(-1);
  };

  const onHanlePlayAudio = async (value: string, index: number) => {
    setSelectionAudio(() => value);
    if (data) {
      const newAudio = new Audio(data.vocabularies[index].voiceSrc);
      setAudio(() => newAudio);
      setIsPlaying(() => true);
    }
  };

  useEffect(() => {
    if (audio) isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audio) {
      audio.onended = function () {
        setIsPlaying(() => false);
      };
    }
  });

  const renderSentenceList = () => {
    return data?.vocabularies.map((record: VocabularyTypeWithNativeLanguageResponse, index: number) => {
      return (
        <Container className={`p-4 bg-white divider flex items-center`} key={record.vocabularyId}>
          <Radio
            onChange={() => onHanlePlayAudio(record.vocabularyId, index)}
            checked={selectionAudio === record.vocabularyId}
            value={record.vocabularyId}
            icon={<Avatar src={SpeakerIcon} className='w-5 h-5' />}
            checkedIcon={<Avatar src={SpeakerFillIcon} className='w-5 h-5' />}
            disabled={isPlaying || !record.voiceSrc}
          />
          <Typography className='grow'>{record.vtitleDisplayLanguage}</Typography>
          <Radio checked={!!record.voiceSrc} icon={<></>} checkedIcon={<Avatar src={CheckIcon} className='w-5 h-5' />} />
        </Container>
      );
    });
  };

  return (
    <Box className='flex flex-col grow min-h-screen bg-gray-100'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleBack}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>Sentences list</Typography>
        </Box>
      </Container>
      <Box className='p-4'>{data && renderSentenceList()}</Box>
    </Box>
  );
}
