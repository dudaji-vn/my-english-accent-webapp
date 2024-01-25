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
import { useGetUserRecordCertificateQuery } from "@/core/services";
import ROUTER from "@/shared/const/router.const";
import { Alert, Avatar, Box, Button, Container, IconButton, Snackbar, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";

interface IModalCompleteCertificateProps {}
const UserPlaylist = (props: IModalCompleteCertificateProps) => {
  const swiperRef = useRef<SwiperRef>(null);
  const trackingSwiper = useRef(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { userId } = useParams();

  const { data: userCertificate, isFetching } = useGetUserRecordCertificateQuery({
    slug: userId ?? "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
  };
  const handleLike = () => {
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
    if (!userCertificate || !userCertificate.records || !swiperRef || !swiperRef.current?.swiper) {
      return;
    }
    if (currentIndex === userCertificate.records.length - 1) {
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
  const navigate = useNavigate();
  return (
    <Box className="h-screen bg-gray-100">
      <Container className="py-4 divider bg-gray-100 sticky top-0 z-10">
        <Box className="flex items-center gap-2">
          <IconButton onClick={() => navigate(ROUTER.LEADER_BOARD)}>
            <Avatar src={CloseIcon} className="w-6 h-6" />
          </IconButton>
          <Typography className="text-large-semibold grow">{"Quang Linh's voice recording"}</Typography>
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
            src={"https://res.cloudinary.com/hoquanglinh/image/upload/v1700118507/sudq1kkwlrlfj18afaic.png"}
            variant="square"
            alt="gallery-icon"
          />

          {isFetching ? (
            <Box sx={{ minHeight: "500px", transition: "height 3s ease" }}>
              <Loading />
            </Box>
          ) : (
            <>
              {userCertificate?.certificateName && (
                <Typography className="text-2xl font-semibold mb-6">{userCertificate?.certificateName}</Typography>
              )}

              <Box className={`w-full px-4`}>
                <Swiper
                  className="md:max-w-[600px]"
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
                  {userCertificate?.records.map((record) => (
                    <SwiperSlide key={record.recordId}>
                      <Box className="bg-gray-50 p-4 pb-10 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border min-h-[100px] ">
                        <Typography className="text-small-medium break-words ">{record.title}</Typography>
                        <Typography className="text-small-regular break-all" variant="body2">
                          {record.phonetic}
                        </Typography>
                      </Box>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Box className="w-full flex items-center justify-around mt-6 mb-12">
                  <IconButton>
                    <Avatar src={false ? ActivedLoopIcon : LoopIcon} alt="wave-icon" className="w-6 h-6" />
                  </IconButton>
                  <IconButton>
                    <Avatar src={currentIndex >= 1 ? PreviosIcon : DisablePreviosIcon} alt="wave-icon" className="w-6 h-6" />
                  </IconButton>
                  <IconButton
                    onClick={handlePlayAudio}
                    disabled={userCertificate?.records.length === 0}
                    className="bg-primary w-16 h-16"
                  >
                    <Avatar src={isPlaying ? PauseIcon : PlayIcon} alt="wave-icon" className="w-6 h-6" />
                  </IconButton>
                  <IconButton>
                    <Avatar src={true ? NextIcon : DisableNextIcon} alt="wave-icon" className="w-6 h-6" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      navigate(ROUTER.LISTENING + ROUTER.SELECT_LECTURE);
                    }}
                  >
                    <Avatar variant="square" src={LectureListIcon} alt="wave-icon" className="w-6 h-6" />
                  </IconButton>
                </Box>
                {userCertificate && userCertificate?.records && (
                  <audio
                    autoPlay={isPlaying}
                    onEnded={handleEnded}
                    ref={audioRef}
                    src={userCertificate?.records[currentIndex].voiceSrc}
                  />
                )}
              </Box>
              <Box className="mb-4 w-full  flex items-center gap-8 justify-around">
                <Box className="flex items-center">
                  <IconButton className="" onClick={handleLike}>
                    {isLiked ? <LikedIcon /> : <LikeIcon />}
                  </IconButton>
                  <Typography className="text-primary">10</Typography>
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
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserPlaylist;
