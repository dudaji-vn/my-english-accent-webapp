import LoopIcon from "@/assets/icon/loop-icon.svg";
import NextIcon from "@/assets/icon/next-icon.svg";
import PlayIcon from "@/assets/icon/play-icon.svg";
import PreviosIcon from "@/assets/icon/previos-icon.svg";
import ShuffleIcon from "@/assets/icon/shuffle-icon.svg";
import VerticalMore from "@/assets/icon/vertial-more-icon.svg";

import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

export default function PlaylistPod() {
  const [slideIndex, setSlideIndex] = useState(0);

  const onSlideChange = (val: SwiperClass) => {
    setSlideIndex(() => val.activeIndex);
  };

  const renderSlide = () => {
    return (
      <SwiperSlide key={"voca.vocabularyId"}>
        <Box className='bg-gray-50 p-4  flex flex-col items-center swiper-slide-transform rounded-lg border-stroke border-solid border max-h-[208px] h-[208px]'>
          <Typography className='text-small-medium'>{"If the issue is clear, I want to update your task's status as 'in progress'. Is it possible?"}</Typography>
          <Typography className='text-small-regular' variant='body2'>
            {"/ɪf ðə ˈɪʃu ɪz klɪr, aɪ wɑnt tu ˌʌpˈdeɪt jʊr tæsks ˈsteɪtəs æz ɪn ˈprɑɡrɛs. ɪz ɪt ˈpɑsəbl/"}
          </Typography>
        </Box>
      </SwiperSlide>
    );
  };

  return (
    <Box>
      <Box className='flex justify-between p-4'>
        <Typography className='text-base-medium'>CodeTalk - 4. Team Meeting with stakeholder</Typography>
        <IconButton>
          <Avatar src={VerticalMore} alt='wave-icon' className='w-6 h-6' />
        </IconButton>
      </Box>
      <Box className='px-4'>
        <Swiper pagination={true} modules={[Pagination]} onSlideChange={onSlideChange}>
          {renderSlide()}
        </Swiper>
      </Box>

      <Box className='flex justify-around py-4'>
        <IconButton>
          <Avatar src={ShuffleIcon} alt='wave-icon' className='w-6 h-6' />
        </IconButton>
        <IconButton>
          <Avatar src={PreviosIcon} alt='wave-icon' className='w-6 h-6' />
        </IconButton>
        <IconButton className='bg-primary'>
          <Avatar src={PlayIcon} alt='wave-icon' className='w-6 h-6' />
        </IconButton>
        <IconButton>
          <Avatar src={NextIcon} alt='wave-icon' className='w-6 h-6' />
        </IconButton>
        <IconButton>
          <Avatar src={LoopIcon} alt='wave-icon' className='w-6 h-6' />
        </IconButton>
      </Box>
    </Box>
  );
}
