import { Container, Box, Avatar, Typography, Button, Grid, Radio } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import FooterBtn from "@/components/FooterBtn";
import { RecordTypeResponse } from "@/core/type";
import { useGetAllRecordInChallengeQuery } from "@/core/services/challenge.service";
import { useRef, useState, useEffect } from "react";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import { IChallengeSummaryDisplay } from "@/core/type/challenge.type";

export function ClubAudioRecord({ vocabularies, challengeName }: IChallengeSummaryDisplay) {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectionRecordId, setSelectionRecordId] = useState("");

  const onHandleRerecordPage = ({ vocabularyId, recordId, voiceRecord }: { vocabularyId: string; recordId: string; voiceRecord: string }) => {
    console.log(vocabularyId, recordId, voiceRecord);
    navigate(
      {
        pathname: ROUTER.RERECORD + `/${challengeName.toLowerCase()}`,
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

export default function ClubRecordingSummaryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = useGetAllRecordInChallengeQuery(state.challengeId);

  const onHandleContinue = () => {
    navigate({
      pathname: ROUTER.CLUB_DETAIL + "/" + ROUTER.CLUB_STUDY + "/" + state.clubId,
    });
  };

  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Typography className='text-large-semibold'>Finished</Typography>
      </Container>

      <Container className='py-4 bg-gray-100 flex flex-col grow '>
        <Box className='flex flex-col justify-center items-center p-4 bg-white border rounded-t-lg'>
          <Typography component={"h6"}>{data && data.vocabularies.length}</Typography>
          <Typography variant='body2' className='text-base-regular'>
            Sentences practiced
          </Typography>
        </Box>
        {data && <ClubAudioRecord {...data} />}
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
