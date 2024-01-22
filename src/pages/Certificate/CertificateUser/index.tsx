import MedalActiveIcon from "@/assets/icon/medal-color-icon.svg";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import StarIcon from "@/assets/icon/star-icon.svg";
import StartActiveIcon from "@/assets/icon/start-color-icon.svg";
import CopyIcon from "@/components/icons/copy-icon";
import { useGetUserRecordCertificateQuery } from "@/core/services";
import { Alert, Avatar, Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperClass, SwiperRef, SwiperSlide } from "swiper/react";
import Loading from "@/components/Loading";
interface IModalCompleteCertificateProps {}
const CertificateUser = (props: IModalCompleteCertificateProps) => {
  const swiperRef = useRef<SwiperRef>(null);
  const trackingSwiper = useRef(Date.now());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { slug } = useParams();

  const { data: userCertificate, isFetching } = useGetUserRecordCertificateQuery({
    slug: slug ?? "",
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopyClick = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
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
  return (
    <Box className="flex mt-0 md:mt-0 flex-col items-center justify-center md:h-screen ">
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={isCopying} autoHideDuration={3000}>
        <Alert severity="success">Your link has been copied successfully.</Alert>
      </Snackbar>
      <Box className="flex mt-4 md:mt-6 items-center justify-center">
        <Box
          sx={{
            border: "8px solid rgba(127, 86, 217, 0.24)",
            maxWidth: "calc(100vw - 32px)",
          }}
          className="shadow-[0_1px_3px_0px_#A6AFC366]bg-white rounded-2xl flex flex-col items-center justify-center w-[100vw] lg:w-[500px]"
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
              marginBottom: "12px",
            }}
            src={MedalActiveIcon}
            variant="square"
            alt="gallery-icon"
          />
          {userCertificate?.star && (
            <Box
              className="flex gap-5 mb-2 md:mb-9"
              sx={{
                display: "flex",
                gap: "20px",
                marginBottom: "36px",
              }}
            >
              {[1, 2, 3, 4].map((star) => {
                return (
                  <Avatar
                    sx={{
                      width: 20,
                      height: 20,
                    }}
                    variant="square"
                    src={userCertificate?.star < star ? StarIcon : StartActiveIcon}
                  />
                );
              })}
            </Box>
          )}

          {userCertificate?.certificateName && (
            <Typography className="text-2xl font-semibold mb-2">{userCertificate?.certificateName}</Typography>
          )}
          {userCertificate?.score && userCertificate.totalScore && (
            <Typography className="text-textSecondary font-semibold mb-6">{`  Highest result: ${
              (userCertificate!.score * 100) / userCertificate!.totalScore
            }%`}</Typography>
          )}

          <Typography className="mb-2 md:mb-4 text-center">This certificate is presented to</Typography>
          {isFetching ? (
            <Box sx={{ minHeight: "500px", transition: "height 3s ease" }}>
              <Loading />
            </Box>
          ) : (
            <>
              <Typography className="px-4 text-center uppercase text-secondary !leading-[1.1] text-3xl md:text-4xl font-semibold mb-4 ">
                {userCertificate?.nickName}
              </Typography>

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
                <Box className="w-full flex justify-center my-6">
                  <IconButton
                    onClick={handlePlayAudio}
                    disabled={userCertificate?.records.length === 0}
                    className="bg-primary w-16 h-16"
                  >
                    <Avatar src={isPlaying ? PauseIcon : PlayIcon} alt="wave-icon" className="w-6 h-6" />
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
              <Box className="mb-4 w-full justify-center flex items-center px-4">
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

export default CertificateUser;
