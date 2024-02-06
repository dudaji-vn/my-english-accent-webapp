import { ILectureDisplay, RecordTypeResponse } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import { Avatar, Container, Radio, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
export function AudioRecord({ vocabularies, lectureName }: ILectureDisplay) {
  const navigate = useNavigate();
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectionAudio, setSelectionAudio] = useState("");

  const onHandleRerecordPage = ({
    vocabularyId,
    recordId,
    voiceRecord,
  }: {
    vocabularyId: string;
    recordId: string;
    voiceRecord: string;
  }) => {
    if (!isPlaying) {
      navigate(
        {
          pathname: ROUTER.RERECORD + `/${lectureName.toLowerCase()}`,
        },
        {
          state: {
            vocabularyId,
            recordId,
            voiceRecord,
          },
        }
      );
    }
  };

  const onHanlePlayAudio = async (value: string) => {
    setSelectionAudio(() => value);
    const index = vocabularies.findIndex((record: RecordTypeResponse) => record.recordId === value);
    const newAudio = new Audio(vocabularies[index].voiceSrc);
    setAudio(() => newAudio);
    setIsPlaying(() => true);
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

  const renderAudioList = () => {
    return vocabularies.map((record: any) => {
      return (
        <Container className={`p-4 bg-white divider last:rounded-b-lg flex items-center`} key={record.recordId}>
          <Radio
            onChange={() => onHanlePlayAudio(record.recordId)}
            checked={selectionAudio === record.recordId}
            value={record.recordId}
            icon={<Avatar src={SpeakerIcon} className="w-5 h-5" />}
            checkedIcon={<Avatar src={SpeakerFillIcon} className="w-5 h-5" />}
            disabled={isPlaying}
          />

          <Typography
            onClick={() =>
              onHandleRerecordPage({
                recordId: record.recordId,
                vocabularyId: record.vocabularyId,
                voiceRecord: record.rVoiceSrc,
              })
            }
            className="text-base-medium grow"
          >
            {record.vtitleDisplayLanguage}
          </Typography>
        </Container>
      );
    });
  };

  return <>{renderAudioList()}</>;
}
