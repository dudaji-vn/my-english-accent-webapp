import { Container, Box, IconButton, Avatar, Typography, Button, Grid } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@/assets/icon/close-icon.svg";
import ROUTER from "@/shared/const/router.const";
import FooterBtn from "@/components/FooterBtn";
import persist from "@/shared/utils/persist.util";
import { useGetAllRecordsOfVocabularyQuery } from "@/core/services/recordProgress.service";
import { useEffect, useRef, useState } from "react";
import { Radio } from "@mui/material";

import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import { ILectureDisplay, RecordTypeResponse } from "@/core/type";

function AudioRecord({ vocabularies, lectureName }: ILectureDisplay) {
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

export default function RecordSummaryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const myId = persist.getMyInfo().userId;
  const { data } = useGetAllRecordsOfVocabularyQuery({ myId, lectureId: state.lectureId });

  const onHandleContinue = () => {
    navigate(ROUTER.RECORD);
  };

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={onHandleContinue}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>Finished</Typography>
        </Box>
      </Container>

      <Container className='py-4 bg-gray-100 flex flex-col grow '>
        <Box className='flex flex-col justify-center items-center p-4 bg-white border rounded-t-lg'>
          <Typography component={"h6"}>{data && data.vocabularies.length}</Typography>
          <Typography variant='body2' className='text-base-regular'>
            Sentences practiced
          </Typography>
        </Box>
        {data && <AudioRecord {...data} />}
      </Container>

      <FooterBtn>
        <Button variant='contained' className='rounded-md m-auto' onClick={onHandleContinue}>
          <Typography className='text-base-medium' color={"white"}>
            Continue practice
          </Typography>
        </Button>
      </FooterBtn>
    </Box>
  );
}
