import BlackPauseIcon from "@/assets/icon/black-pause-icon.svg";
import VerticalMore from "@/assets/icon/vertial-more-icon.svg";
import NoMemberIcon from "@/assets/icon/no-member-club-icon.svg";

import { useGetPlaylistListenByLectureQuery, useGetPlaylistSummaryQuery } from "@/core/services/listen.service";
import { useAppSelector } from "@/core/store";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import ActionControllPlaylist from "../ActionControllPlaylist";
import QuenePlaylist from "../QuenePlaylist";
import { RecordTypeResponse, UserResponseType } from "@/core/type";
import Loading from "../Loading";
import EmptyLecture from "@/pages/Listen/EmptyLectures";

export interface UserPlayingType extends UserResponseType, RecordTypeResponse {
  isPlaying: boolean;
  isPlayed: boolean;
}

export default function PlaylistPod() {
  //call api
  const { isSuccess } = useGetPlaylistSummaryQuery();
  const lectureId = useAppSelector((state) => state.GlobalStore.listenPage.lectureId);
  const { data: playlistDetail, isFetching } = useGetPlaylistListenByLectureQuery(isSuccess ? lectureId : skipToken);
  //state
  const actionControllPlaylistElementRef = useRef(null);
  const swiperRef = useRef<SwiperRef>(null);
  const [usersRecord, setUsersRecord] = useState<UserPlayingType[]>([]);

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
    },
    [playlistDetail]
  );

  const onSlideChange = (val: SwiperClass) => {
    if (!actionControllPlaylistElementRef.current) return;

    const isManualSwipe = trackingSwiper.current && Date.now() - trackingSwiper.current < 300;
    if (isManualSwipe) {
      loadUserRecord(val.activeIndex, false);
      (actionControllPlaylistElementRef.current as any).setIndexPlaying(0);
      (actionControllPlaylistElementRef.current as any).setIsPlayingStatus(false);
    } else {
      loadUserRecord(val.activeIndex, true);
      (actionControllPlaylistElementRef.current as any).setIndexPlaying(0);
      (actionControllPlaylistElementRef.current as any).setIsPlayingStatus(true);
    }
  };

  const onSelectUserPlay = (index: number) => {
    if (!actionControllPlaylistElementRef.current) return;

    (actionControllPlaylistElementRef.current as any).onHandlePlayAudio(index);
    (actionControllPlaylistElementRef.current as any).setIndexPlaying(index);
    (actionControllPlaylistElementRef.current as any).setIsPlayingStatus(true);
  };

  useEffect(() => {
    loadUserRecord(0, false);
  }, [isFetching]);

  if (isFetching) return <Loading />;

  return (
    <Box>
      <Box className='flex justify-between p-4'>
        <Typography className='text-base-medium'>{playlistDetail?.lecture.lectureName}</Typography>
        <IconButton>
          <Avatar src={VerticalMore} alt='wave-icon' className='w-6 h-6' />
        </IconButton>
      </Box>

      <Box className='px-4' sx={{ width: `calc(100vw - 32px)` }}>
        <Swiper pagination={true} modules={[Pagination]} onSlideChange={onSlideChange} ref={swiperRef} onTouchEnd={() => (trackingSwiper.current = Date.now())}>
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
        ref={actionControllPlaylistElementRef}
        setUsersRecord={(val: UserPlayingType[]) => {
          setUsersRecord(() => [...val]);
        }}
        onNextSlideIndex={() => {
          if (!swiperRef.current) return;
          swiperRef.current.swiper.slideNext(undefined, true);
        }}
      />

      <QuenePlaylist usersRecord={usersRecord} />

      <Box className='p-4'>
        <Typography className='text-base-medium pb-4'>People</Typography>

        {usersRecord.length ? (
          usersRecord.map((user, index) => (
            <Grid container key={user.userId} alignItems='center' justifyItems={"center"} padding={1} onClick={() => onSelectUserPlay(index)}>
              <Grid item xs={1}>
                {user.isPlaying ? <Avatar alt='avatar-icon' className='w-6 h-6' src={BlackPauseIcon} /> : <Typography className='text-small-regular'>{index + 1}</Typography>}
              </Grid>
              <Grid item xs={2}>
                <Avatar alt='avatar-icon' className='w-9 h-9'>
                  {user.nickName.slice(0, 1)}
                </Avatar>
              </Grid>
              <Grid item xs={2}>
                <Typography className='text-small-medium'>{user.nickName}</Typography>
              </Grid>
              <Typography className='text-extra-small-medium  text-secondary'>{user.recordId}</Typography>

              {/* <Typography className='text-extra-small-medium  text-secondary'>{user.isPlaying ? "Speaking now" : null}</Typography> */}
            </Grid>
          ))
        ) : (
          <EmptyLecture classes='bg-white' />
        )}
      </Box>
    </Box>
  );
}
