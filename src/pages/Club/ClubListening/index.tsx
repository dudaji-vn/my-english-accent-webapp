import { Box, Container, IconButton, Avatar, Typography, Button } from "@mui/material";
import CloseIcon from "@/assets/icon/close-icon.svg";
import { useNavigate } from "react-router-dom";
import FooterCard from "@/components/FooterBtn";
import { useMultiAudio } from "@/shared/hook/useMultiAudio";
import { useRef } from "react";

import "swiper/less/pagination";
import { Pagination } from "swiper/modules";

const exampleAudio = [
  "",
  //   "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Ftopic_NA5SE36AF0rg8BvnNNiUe%2Fvocabulary_MqPGFlc-a0XnlLtu3kXVC%2Fvoice_DwRjcCyd0HgZAcngdguJp?alt=media&token=fbb79a99-0bf8-440e-88d4-3cfb23011213",
  //   "https://firebasestorage.googleapis.com/v0/b/my-english-accent-239fb.appspot.com/o/audio%2Ftopic_NA5SE36AF0rg8BvnNNiUe%2Fvocabulary_MqPGFlc-a0XnlLtu3kXVC%2Fvoice_DwRjcCyd0HgZAcngdguJp?alt=media&token=fbb79a99-0bf8-440e-88d4-3cfb23011213",
];

export default function ClubListeningPage() {
  const navigate = useNavigate();
  const { players, indexAudio, playAudio } = useMultiAudio(exampleAudio);

  const swiperElRef = useRef(null);

  const onHandlePlayAll = () => {
    playAudio(0);
  };
  return (
    <Box className='flex flex-col grow'>
      <Container className='py-4 divider bg-white'>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={() => navigate(-1)}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>{"Word - guessing with designer"}</Typography>
        </Box>
      </Container>
      <Box className='max-h-[208px] p-4'>
        <swiper-container ref={swiperElRef} slides-per-view='1'>
          <swiper-slide>
            <Box className='rounded-lg p-4 bg-white'>
              <Typography className='text-small-medium'>This is a constant which cannot be reassigned</Typography>
              <Typography className='text-small-regular'>/ðɪs ɪz ə ˈkɒnstənt wɪʧ ˈkænət bi ˌriːəˈsaɪnd/</Typography>
            </Box>
          </swiper-slide>
        </swiper-container>
      </Box>
      <FooterCard classes='items-center'>
        <Button variant='contained' className='rounded-md m-auto grow' onClick={onHandlePlayAll}>
          <Typography className='text-base-medium ' color={"white"}>
            LIsten all
          </Typography>
        </Button>
      </FooterCard>
    </Box>
  );
}
