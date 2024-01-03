import SpeakerFillIcon from "@/assets/icon/volume-fill-icon.svg";
import SpeakerIcon from "@/assets/icon/volume-icon.svg";
import FooterBtn from "@/components/FooterBtn";
import Loading from "@/components/Loading";
import { useGetAllRecordInChallengeQuery, usePrefetch } from "@/core/services/challenge.service";
import { RecordTypeResponse } from "@/core/type";
import { IChallengeSummaryDisplay } from "@/core/type/challenge.type";
import ROUTER from "@/shared/const/router.const";
import { Avatar, Box, Button, Container, Radio, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ClubAudioRecord({ vocabularies, challengeName, clubId, challengeId }: IChallengeSummaryDisplay) {
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectionRecordId, setSelectionRecordId] = useState("");

  const onRedirectRerecordPage = ({ vocabularyId, recordId, voiceRecord }: { vocabularyId: string; recordId: string; voiceRecord: string }) => {
    navigate(
      {
        pathname: ROUTER.RERECORD + `/${challengeName.toLowerCase()}`,
      },

      {
        state: {
          vocabularyId,
          recordId,
          voiceRecord,
          challengeId,
          clubId: clubId,
        },
      }
    );
  };

  const onHanlePlayAudio = (value: string) => {
    setSelectionRecordId(() => value);
    const index = vocabularies.findIndex((record: RecordTypeResponse) => record.recordId === value);
    if (audioRef.current) {
      (audioRef.current as HTMLAudioElement).src = vocabularies[index].voiceSrc;
      setIsPlaying(() => true);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.play() : audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = function () {
        setSelectionRecordId(() => "");
        setIsPlaying(() => false);
      };
    }
  }, []);

  const renderAudioList = () => {
    return vocabularies.map((record: any) => {
      return (
        <Container className={`p-4 bg-white divider last:rounded-b-lg flex items-center`} key={record.recordId}>
          <Radio
            onChange={() => onHanlePlayAudio(record.recordId)}
            checked={selectionRecordId === record.recordId}
            value={record.recordId}
            icon={<Avatar src={SpeakerIcon} className='w-5 h-5' />}
            checkedIcon={<Avatar src={SpeakerFillIcon} className='w-5 h-5' />}
            disabled={isPlaying}
          />
          <audio ref={audioRef} />
          <Typography
            className='text-base-medium grow'
            onClick={() =>
              onRedirectRerecordPage({
                recordId: record.recordId,
                vocabularyId: record.vocabularyId,
                voiceRecord: record.voiceSrc,
              })
            }
          >
            {record.vtitleDisplayLanguage}
          </Typography>
        </Container>
      );
    });
  };

  return <>{renderAudioList()}</>;
}

export default function ClubRecordingSummaryPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data, isFetching } = useGetAllRecordInChallengeQuery(state.challengeId);
  console.log(data);

  const prefetChallengesInCLub = usePrefetch("getChallengesInClub", {
    force: true,
  });

  const onHandleContinue = () => {
    navigate({
      pathname: ROUTER.CLUB_DETAIL + ROUTER.CLUB_STUDY + "/" + state.clubId,
    });
    prefetChallengesInCLub(state.clubId);
  };

  if (isFetching) return <Loading />;

  return (
    <Box className='flex flex-col grow min-h-screen'>
      <Container className='py-4 divider bg-white'>
        <Typography className='text-large-semibold'>Finished</Typography>
      </Container>

      <Container className='py-4 bg-gray-100 flex flex-col grow '>
        <Box className='flex flex-col justify-center items-center p-4 bg-white border rounded-t-lg'>
          <Typography component={"h6"}>{data?.vocabularies.length}</Typography>
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
