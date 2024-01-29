import ActivedLoopIcon from "@/assets/icon/active-loop-icon.svg";
import CloseIcon from "@/assets/icon/close-icon.svg";
import DisableNextIcon from "@/assets/icon/disable-next-icon.svg";
import DisablePreviosIcon from "@/assets/icon/disable-previous-icon.svg";
import LectureListIcon from "@/assets/icon/lecture-list-icon.svg";
import LoopIcon from "@/assets/icon/loop-icon.svg";
import NextIcon from "@/assets/icon/next-icon.svg";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import PreviosIcon from "@/assets/icon/previos-icon.svg";
import Loading from "@/components/Loading";
import CopyIcon from "@/components/icons/copy-icon";
import LikeIcon from "@/components/icons/like-icon";
import LikedIcon from "@/components/icons/liked-icon";
import { useGetPlaylistSummaryByUserQuery, useLazyGetPlaylistByUserQuery } from "@/core/services";
import ROUTER from "@/shared/const/router.const";
import { Alert, Avatar, Box, Button, Container, IconButton, Snackbar, Typography } from "@mui/material";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

interface IModalCompleteCertificateProps {}
const UserPlaylist = (props: IModalCompleteCertificateProps) => {
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperRef>(null);
  const trackingSwiper = useRef(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { userId } = useParams();
  const { data: playlistSummary, isLoading: isLoadingPlaylistSummary } = useGetPlaylistSummaryByUserQuery(userId ?? skipToken);

  const [trigger, { data: userPlaylist, isFetching: isUserPlaylistLoading }] = useLazyGetPlaylistByUserQuery();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexLecture, setCurrentIndexLecture] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(0);

  useEffect(() => {
    if (userPlaylist?.isLiked) {
      setIsLiked(userPlaylist?.isLiked);
    }
    setLikesCount(userPlaylist?.likes ?? 0);
  }, [userPlaylist]);

  const currentLecture = useMemo(() => {
    if (currentIndexLecture < 0 || !playlistSummary || playlistSummary?.lectures.length === 0) {
      return null;
    }
    return playlistSummary.lectures[currentIndexLecture];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndexLecture, playlistSummary?.lectures.length]);

  const isDisableNext = useMemo(() => {
    if (!playlistSummary) {
      return true;
    }
    return currentIndexLecture >= playlistSummary.lectures.length - 1;
  }, [currentIndexLecture, playlistSummary]);
  const isDisablePrevious = useMemo(() => {
    return currentIndexLecture <= 0;
  }, [currentIndexLecture]);

  useEffect(() => {
    if (!userId || !currentLecture) {
      return;
    }

    trigger({
      userId: userId,
      lectureId: currentLecture?.lectureId,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLecture]);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
  };
  const handleLike = () => {
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
    setIsLiked(!isLiked);
  };
  const handlePlayAudio = () => {
    if (!audioRef.current) {
      return;
    }
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setIsPlaying(true);
      audioRef.current.play();
    }
  };
  const handleEnded = () => {
    if (!userPlaylist || !userPlaylist.records || !swiperRef || !swiperRef.current?.swiper) {
      return;
    }
    if (currentIndex === userPlaylist.records.length - 1) {
      swiperRef.current.swiper.slideTo(0);
      setCurrentIndex(0);
      setIsPlaying(false);
      return;
    }

    swiperRef.current.swiper.slideTo(currentIndex + 1);
    setCurrentIndex(currentIndex + 1);
  };
  const onSlideChange = (val: SwiperClass) => {
    const isManualSwipe = trackingSwiper.current && Date.now() - trackingSwiper.current < 300;
    if (isManualSwipe) {
      setIsPlaying(false);
    }
    if (audioRef && audioRef.current) {
      audioRef.current.pause();
      setCurrentIndex(val.activeIndex);
    }
  };

  const handleGotoNext = () => {
    setCurrentIndexLecture(currentIndexLecture + 1);
  };
  const handleGotoPrevious = () => {
    setCurrentIndexLecture(currentIndexLecture - 1);
  };

  if (isLoadingPlaylistSummary || !currentLecture || !playlistSummary) {
    return <Loading />;
  }
  return (
    <Box className="h-screen bg-gray-100">
      <Container className="py-4 divider bg-gray-100 sticky top-0 z-10">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => navigate(ROUTER.LEADER_BOARD)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold grow">{`${playlistSummary?.nickName}'s voice recording`}</Typography>
        </Box>
      </Container>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCopying} autoHideDuration={3000}>
        <Alert severity="success">Your link has been copied successfully.</Alert>
      </Snackbar>
      <Box className="p-4 flex mt-0 md:mt-0 flex-col items-center">
        <Box
          sx={{
            maxWidth: "calc(100vw - 32px)",
          }}
          className="p-6 shadow-xl bg-white rounded-2xl flex flex-col items-center justify-center w-[100vw] lg:w-[500px]"
        >
          <Avatar
            sx={{
              width: "auto",
              height: "64px",
              marginBottom: "16px",
            }}
            src={currentLecture.imgSrc}
            variant="square"
            alt="gallery-icon"
          />

          <>
            {currentLecture.lectureName && (
              <Typography className="text-xl font-semibold mb-6">{currentLecture.lectureName}</Typography>
            )}

            <Box className={`w-full px-4`}>
              <Swiper
                className="md:max-w-[600px] "
                pagination={{
                  enabled: true,
                  horizontalClass: "bottom-0",
                }}
                slidesPerView={"auto"}
                modules={[Pagination]}
                onSlideChange={onSlideChange}
                ref={swiperRef}
                onTouchEnd={() => (trackingSwiper.current = Date.now())}
                onReachEnd={() => {}}
              >
                {isUserPlaylistLoading ? (
                  <div className="bg-gray-50 p-4 pb-10 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border h-[150px]">
                    <Loading />
                  </div>
                ) : (
                  userPlaylist?.records.map((record) => (
                    <SwiperSlide key={record.recordId}>
                      <Box className="bg-gray-50 p-4 pb-10 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border min-h-[100px]">
                        <Typography className="text-small-medium break-words ">{record.title}</Typography>
                        <Typography className="text-small-regular break-all" variant="body2">
                          {record.phonetic}
                        </Typography>
                      </Box>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
              <Box className="w-full flex items-center justify-around mt-6 mb-12">
                <IconButton>
                  <Avatar src={false ? ActivedLoopIcon : LoopIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
                <IconButton disabled={isDisablePrevious} onClick={handleGotoPrevious}>
                  <Avatar src={isDisablePrevious ? DisablePreviosIcon : PreviosIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
                <IconButton
                  onClick={handlePlayAudio}
                  disabled={userPlaylist?.records.length === 0}
                  className="bg-primary w-16 h-16"
                >
                  <Avatar src={isPlaying ? PauseIcon : PlayIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
                <IconButton disabled={isDisableNext} onClick={handleGotoNext}>
                  <Avatar src={isDisableNext ? DisableNextIcon : NextIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    navigate(ROUTER.LISTENING + ROUTER.SELECT_LECTURE);
                  }}
                >
                  <Avatar variant="square" src={LectureListIcon} alt="wave-icon" className="w-6 h-6" />
                </IconButton>
              </Box>
              {userPlaylist && userPlaylist?.records && (
                <audio
                  autoPlay={isPlaying}
                  onEnded={handleEnded}
                  ref={audioRef}
                  src={userPlaylist?.records[currentIndex].voiceSrc}
                />
              )}
            </Box>

            <Box className="mb-4 w-full  flex items-center gap-8 justify-around">
              <Box className="flex items-center">
                <IconButton className="" onClick={handleLike}>
                  {isLiked ? <LikedIcon /> : <LikeIcon />}
                </IconButton>
                <Typography className="text-primary">{likesCount}</Typography>
              </Box>
              <Button
                onClick={handleCopyClick}
                startIcon={<CopyIcon />}
                sx={{
                  borderRadius: "20px",
                }}
                color="primary"
              >
                Copy link
              </Button>
            </Box>
          </>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPlaylist;
