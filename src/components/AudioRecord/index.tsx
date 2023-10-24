import { ILectureDisplay, RecordTypeResponse } from "@/core/type";
import ROUTER from "@/shared/const/router.const";
import { Grid, Radio, Avatar, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
export function AudioRecord({ vocabularies, lectureName }: ILectureDisplay) {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectionRecordId, setSelectionRecordId] = useState("");

  const onHandleRerecordPage = ({ vocabularyId, recordId, voiceRecord }: { vocabularyId: string; recordId: string; voiceRecord: string }) => {
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
  };

  const onHanlePlayAudio = (value: string) => {
    setSelectionRecordId(() => value);
    const index = vocabularies.findIndex((record: RecordTypeResponse) => record.recordId === value);
    if (audioRef.current) {
      (audioRef.current as HTMLAudioElement).src = vocabularies[index].rVoiceSrc;
      setIsPlaying(() => true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      console.log("isPlaying", isPlaying);
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  (function () {
    if (audioRef.current) {
      audioRef.current.onended = function () {
        setSelectionRecordId(() => "");
        setIsPlaying(() => false);
        console.log("eneded");
      };
    }
  })();
  // useEffect(() => {
  //   if (audioRef.current) {
  //     audioRef.current.onended = function () {
  //       setSelectionRecordId(() => "");
  //       setIsPlaying(() => false);
  //       console.log("eneded");
  //     };
  //   }
  //   return () => {
  //     audioRef.current = null;
  //   };
  // }, [audioRef, audioRef.current]);

  const renderAudioList = () => {
    return vocabularies.map((record: any) => {
      return (
        <Grid container gap={1} className={`p-4 bg-white divider last:rounded-b-lg`} key={record.recordId}>
          <Grid item xs={1}>
            <Radio
              onChange={() => onHanlePlayAudio(record.recordId)}
              checked={selectionRecordId === record.recordId}
              value={record.recordId}
              icon={<Avatar src={SpeakerIcon} className='w-5 h-5' />}
              checkedIcon={<Avatar src={SpeakerFillIcon} className='w-5 h-5' />}
            />
            <audio ref={audioRef} />
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() =>
              onHandleRerecordPage({
                recordId: record.recordId,
                vocabularyId: record.vocabularyId,
                voiceRecord: record.rVoiceSrc,
              })
            }
          >
            <Typography className='text-small-medium'>{record.vtitleDisplayLanguage}</Typography>
          </Grid>
          <Grid item xs={1} className='invisible'>
            {/* pesudo tag */}
          </Grid>
          <Grid
            item
            xs={10}
            onClick={() =>
              onHandleRerecordPage({
                recordId: record.recordId,
                voiceRecord: record.rVoiceSrc,
                vocabularyId: record.vocabularyId,
              })
            }
          >
            <Typography variant='body2' className='text-small-regular'>
              {record.vphoneticDisplayLanguage}
            </Typography>
          </Grid>
        </Grid>
      );
    });
  };

  return <>{renderAudioList()}</>;
}