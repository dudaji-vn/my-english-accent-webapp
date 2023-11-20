import BlackPauseIcon from "@/assets/icon/black-pause-icon.svg";
import BlackPlayIcon from "@/assets/icon/black-play-icon.svg";

import { useGetPlaylistListenByLectureQuery, useGetPlaylistSummaryQuery } from "@/core/services/listen.service";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { updateIsTheLastVocabulary } from "@/core/store/index";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import EmptyLecture from "@/pages/Listen/EmptyLectures";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import ActionControllPlaylist, { ActionControllRef } from "../ActionControllPlaylist";
import Loading from "../Loading";
import QuenePlaylist from "../QuenePlaylist";

export interface UserPlayingType extends UserResponseType, RecordTypeResponse {
  isPlaying: boolean;
  isPlayed: boolean;
}

export default function PlaylistPod() {
  const dispatch = useAppDispatch();
  //call api
  const { isSuccess } = useGetPlaylistSummaryQuery();
  const lectureId = useAppSelector((state) => state.GlobalStore.listenPage.lectureId);
  const { data: playlistDetail, isFetching } = useGetPlaylistListenByLectureQuery(isSuccess ? lectureId : skipToken);
  //state
  const actionControlPlaylistElementRef = useRef<ActionControllRef>(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [usersRecord, setUsersRecord] = useState<UserPlayingType[]>([]);
  const [playingStatus, setPlayingStatus] = useState(false);
  const trackingSwiper = useRef(Date.now());

  const loadUserRecord = useCallback(
    (vocabularyIndex: number, isPlaying: boolean) => {
      if (!playlistDetail) return;
      const newUserRecord = playlistDetail.participants[vocabularyIndex].recordUser.map((user, index) => ({
        ...user,
        isPlaying: index === 0 ? isPlaying : false,
        isPlayed: false,
      }));
      setUsersRecord(() => newUserRecord);
      if (vocabularyIndex + 1 != playlistDetail.participants.length) {
        dispatch(updateIsTheLastVocabulary(false));
      }
    },
    [playlistDetail]
  );

  const onHandleActionControl = (index: number, playingStatus: boolean, forcePlayAudio: boolean = false) => {
    if (!actionControlPlaylistElementRef.current) return;

    if (forcePlayAudio) {
      actionControlPlaylistElementRef.current.onHandlePlayAudio(index);
    } else {
      actionControlPlaylistElementRef.current.setIsPlayingStatus(playingStatus);
      actionControlPlaylistElementRef.current.setIndexPlaying(index);
    }
  };

  const onSlideChange = (val: SwiperClass) => {
    const isManualSwipe = trackingSwiper.current && Date.now() - trackingSwiper.current < 300;
    if (isManualSwipe) {
      loadUserRecord(val.activeIndex, false);
      onHandleActionControl(0, false);
    } else {
      loadUserRecord(val.activeIndex, true);
      onHandleActionControl(0, true);
    }
  };

  useEffect(() => {
    loadUserRecord(0, false);
  }, [isFetching, lectureId]);

  if (isFetching) return <Loading />;

  return (
    <Box>
      <Box className='flex justify-center text-center p-4'>
        <Typography className='text-base-medium'>{playlistDetail?.lecture.lectureName}</Typography>
      </Box>

      <Box className='px-4' sx={{ width: `calc(100vw - 32px)` }}>
        <Swiper
          pagination={true}
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
              <Box className='bg-gray-50 p-4 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border max-h-[208px] h-[208px]'>
                <Typography className='text-small-medium'>{voca.vtitleDisplayLanguage}</Typography>
                <Typography className='text-small-regular' variant='body2'>
                  {voca.vphoneticDisplayLanguage}
                </Typography>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <ActionControllPlaylist
        usersRecord={usersRecord}
        ref={actionControlPlaylistElementRef}
        setUsersRecord={(val: UserPlayingType[]) => {
          setUsersRecord(() => [...val]);
        }}
        onNextSlideIndex={() => {
          if (!swiperRef.current) return;
          swiperRef.current.swiper.slideNext();
        }}
        setPlayingStatus={(val: boolean) => setPlayingStatus(() => val)}
      />

      <QuenePlaylist usersRecord={usersRecord} />

      <Box className='p-4'>
        <Typography className='text-base-medium pb-4'>People</Typography>

        {usersRecord.length ? (
          usersRecord.map((user, index) => (
            <Grid container key={user.userId} alignItems='center' justifyItems={"center"} padding={1} onClick={() => onHandleActionControl(index, true, true)}>
              <Grid item xs={1}>
                {user.isPlaying ? (
                  playingStatus ? (
                    <Avatar alt='avatar-icon' className='w-6 h-6' src={BlackPauseIcon} />
                  ) : (
                    <Avatar alt='avatar-icon' className='w-6 h-6' src={BlackPlayIcon} />
                  )
                ) : (
                  <Typography className='text-small-regular'>{index + 1}</Typography>
                )}

                {/* {user.isPlaying ? <Avatar alt='avatar-icon' className='w-6 h-6' src={BlackPauseIcon} /> : <Typography className='text-small-regular'>{index + 1}</Typography>} */}
              </Grid>
              <Grid item xs={2}>
                <Avatar alt='avatar-icon' className='w-9 h-9'>
                  {user.nickName.slice(0, 1)}
                </Avatar>
              </Grid>
              <Grid item xs={5}>
                <Typography className='text-small-medium'>{user.nickName}</Typography>
              </Grid>
              <Typography className='text-extra-small-medium  text-secondary'>{user.isPlaying ? "Speaking now" : null}</Typography>
            </Grid>
          ))
        ) : (
          <EmptyLecture classes='bg-white' />
        )}
      </Box>
    </Box>
  );
}
