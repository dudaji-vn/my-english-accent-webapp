import { useGetPlaylistListenByLectureQuery, useGetPlaylistSummaryQuery } from "@/core/services/listen.service";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateIsPlaying, updateIsTheLastVocabulary } from "@/core/store/index";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import { Avatar, Box, Grid, Theme, Typography, useMediaQuery } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import Loading from "../Loading";
import ActionControlPlaylist, { ActionControlRef } from "./ActionControl";
import PeopleControl from "./PeopleControl";
import QuenePlaylist from "./QuenePlaylist";

export interface UserPlayingType extends UserResponseType, RecordTypeResponse {
  isPlaying: boolean;
  isPlayed: boolean;
}

export default function PlaylistPod() {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const dispatch = useAppDispatch();

  //call api
  const { isSuccess } = useGetPlaylistSummaryQuery();
  const lectureId = useAppSelector((state) => state.GlobalStore.listenPage.lectureId);
  const { data: playlistDetail, isFetching } = useGetPlaylistListenByLectureQuery(isSuccess ? lectureId : skipToken);
  //state
  const actionControlPlaylistElementRef = useRef<ActionControlRef>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [usersRecord, setUsersRecord] = useState<UserPlayingType[]>([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const playingStatus = useAppSelector((state) => state.GlobalStore.listenSetting.isPlaying);

  const trackingSwiper = useRef(Date.now());

  const updatePlaylist = useCallback(
    (vocabularyIndex: number, isPlaying: boolean) => {
      if (playlistDetail && playlistDetail.participants.length) {
        const newUserRecord = playlistDetail.participants[vocabularyIndex].recordUser.map((user, index) => ({
          ...user,
          isPlaying: index === 0 ? isPlaying : false,
          isPlayed: false,
        }));

        setUsersRecord(() => newUserRecord);
        dispatch(updateIsPlaying(isPlaying));
        if (vocabularyIndex + 1 !== playlistDetail.participants.length) {
          dispatch(updateIsTheLastVocabulary(false));
        }
      } else {
        setUsersRecord(() => []);
      }
    },
    [playlistDetail]
  );

  const onHandleActionControl = (index: number, forcePlayAudio: boolean = false) => {
    if (!actionControlPlaylistElementRef.current) return;

    if (forcePlayAudio) {
      actionControlPlaylistElementRef.current.onHandlePlayAudioBySelectUser(index);
    } else {
      actionControlPlaylistElementRef.current.setIndexPlaying(index);
    }
  };

  const onSlideChange = (val: SwiperClass) => {
    setSlideIndex(() => val.activeIndex);
    const isManualSwipe = trackingSwiper.current && Date.now() - trackingSwiper.current < 300;
    if (isManualSwipe) {
      updatePlaylist(val.activeIndex, false);
      onHandleActionControl(0);
    } else {
      updatePlaylist(val.activeIndex, true);
      onHandleActionControl(0);
    }
  };

  useEffect(() => {
    updatePlaylist(0, playingStatus);

    setSlideIndex(() => 0);
    if (!swiperRef.current || !swiperRef.current.swiper) return;
    swiperRef.current.swiper.slideTo(0);
  }, [isFetching, lectureId]);

  if (isFetching) return <Loading />;

  return (
    <Grid container>
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Box className="flex flex-col justify-center items-center gap-4 text-center p-4">
          <Avatar variant="square" className="hidden w-16 h-16 sm:block" src={playlistDetail?.lecture.imgSrc} />
          <Typography className="text-base-medium">{playlistDetail?.lecture.lectureName}</Typography>
        </Box>

        <Box className={`px-4`} sx={isSmallScreen ? { width: `calc(100vw - 32px)` } : {}}>
          <Swiper
            className="md:max-w-[600px]"
            pagination={true}
            slidesPerView={"auto"}
            modules={[Pagination]}
            onSlideChange={onSlideChange}
            ref={swiperRef}
            onTouchEnd={() => (trackingSwiper.current = Date.now())}
            onReachEnd={() => {
              dispatch(updateIsTheLastVocabulary(true));
            }}
          >
            {playlistDetail?.vocabularies.map((voca) => (
              <SwiperSlide key={voca.vocabularyId}>
                <Box className="bg-gray-50 p-4 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border max-h-[208px] h-[208px]">
                  <Typography className="text-small-medium">{voca.vtitleDisplayLanguage}</Typography>
                  <Typography className="text-small-regular" variant="body2">
                    {voca.vphoneticDisplayLanguage}
                  </Typography>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <ActionControlPlaylist
          usersRecord={usersRecord}
          ref={actionControlPlaylistElementRef}
          setUsersRecord={(val: UserPlayingType[]) => {
            setUsersRecord(() => [...val]);
          }}
          onNextSlideIndex={() => {
            if (!swiperRef.current) return;

            if (playlistDetail) {
              if (slideIndex < playlistDetail.vocabularies.length - 1) {
                const nextSlide = slideIndex + 1;
                setSlideIndex(nextSlide);
                swiperRef.current.swiper.slideTo(nextSlide);
              }
            }
          }}
        />

        <QuenePlaylist usersRecord={usersRecord} />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 6}>
        <Box className="p-4">
          <Typography className="text-base-medium pb-4">People</Typography>
          <PeopleControl userRecord={usersRecord} onUserPlayAudio={onHandleActionControl} />
        </Box>
      </Grid>
    </Grid>
  );
}
