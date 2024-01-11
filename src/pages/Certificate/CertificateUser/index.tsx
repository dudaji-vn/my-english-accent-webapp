import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import MedalActiveIcon from "@/assets/icon/medal-color-icon.svg";
import StarIcon from "@/assets/icon/star-icon.svg";
import StartActiveIcon from "@/assets/icon/start-color-icon.svg";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import { useGetPlaylistListenByLectureQuery } from "@/core/services";
import PauseIcon from "@/assets/icon/pause-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import DownloadIcon from "@/components/icons/dowload-icon";
import CopyIcon from "@/components/icons/copy-icon";
interface IModalCompleteCertificateProps {}
const CertificateUser = (props: IModalCompleteCertificateProps) => {
  const swiperRef = useRef<SwiperRef>(null);
  const trackingSwiper = useRef(Date.now());
  const { data: playlistDetail } = useGetPlaylistListenByLectureQuery("6566afd6e16a3a763b425348");

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePlay = () => {};

  return (
    <Box className="flex mt-8 md:mt-0 flex-col items-center justify-center md:h-screen">
      <Typography className="text-center text-primary font-bold text-[25px] md:text-[32px] tracking-wider uppercase">
        TechTalk Certificate
      </Typography>
      <Box className="flex mt-6 items-center justify-center">
        <Box
          sx={{
            border: "8px solid rgba(127, 86, 217, 0.24)",
            maxWidth: "calc(100vw - 32px)",
          }}
          className="shadow-[0_1px_3px_0px_#A6AFC366]bg-white rounded-2xl flex flex-col items-center justify-center lg:w-[500px]"
        >
          <Avatar
            sx={{
              width: "100px",
              height: "100px",
              marginBottom: "28px",
            }}
            src={MedalActiveIcon}
            variant="square"
            alt="gallery-icon"
          />
          <Box
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
                  src={3 < star ? StarIcon : StartActiveIcon}
                />
              );
            })}
          </Box>
          <Typography className="mb-4 text-center">This certificate is presented to</Typography>
          <Typography className="px-4 text-center text-primary text-xl md:text-4xl font-semibold mb-4 ">
            Lê Hà Nguyễn Trần Quang Phương
          </Typography>
          <Typography className="mb-10 text-small-regular text-center">
            For successfully completed the Test IT-English level 2
          </Typography>
          <Box className={`w-full px-4`}>
            <Swiper
              className="md:max-w-[600px]"
              pagination={{
                enabled: true,
                horizontalClass: "bottom-4",
              }}
              slidesPerView={"auto"}
              modules={[Pagination]}
              //onSlideChange={onSlideChange}
              ref={swiperRef}
              onTouchEnd={() => (trackingSwiper.current = Date.now())}
              onReachEnd={() => {}}
            >
              {playlistDetail?.vocabularies.map((voca) => (
                <SwiperSlide key={voca.vocabularyId}>
                  <Box className="bg-gray-50 p-4 flex flex-col items-center text-center gap-4 swiper-slide-transform rounded-lg border-stroke border-solid border min-h-[120px]">
                    <Typography className="text-small-medium">{voca.vtitleDisplayLanguage}</Typography>
                    <Typography className="text-small-regular " variant="body2">
                      {voca.vphoneticDisplayLanguage}
                    </Typography>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
            <Box className="w-full flex justify-center mt-8">
              <IconButton disabled={false} className="bg-primary w-12 h-12">
                <Avatar src={false ? PauseIcon : PlayIcon} alt="wave-icon" className="w-6 h-6" />
              </IconButton>
            </Box>
          </Box>
          <Box className="mb-4 w-full justify-between flex items-center px-4">
            <Button
              startIcon={<DownloadIcon />}
              sx={{
                borderRadius: "20px",
              }}
              color="primary"
            >
              Download
            </Button>
            <Button
              startIcon={<CopyIcon />}
              sx={{
                borderRadius: "20px",
              }}
              color="primary"
            >
              Copy link
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CertificateUser;
