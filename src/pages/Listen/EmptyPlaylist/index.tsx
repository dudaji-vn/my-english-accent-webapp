import { Avatar, Box, Button, Typography } from "@mui/material";
import WaveIcon from "@/assets/icon/wave-icon.svg";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
export default function ListenEmptyPlaylistPage() {
  const navigate = useNavigate();
  return (
    <Box className='flex flex-col grow items-center gap-6 justify-center p-4' sx={{ minHeight: (theme) => `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}>
      <Avatar src={WaveIcon} alt='wave-icon' className='w-16 h-16' />
      <Box className='text-center'>
        <Typography className='text-large-semibold'>Empty playlist</Typography>
        <Typography variant='body2'>Let's choose your favorite lecture and listen to your colleague english accent</Typography>
      </Box>
      <Button variant='contained' onClick={() => navigate(ROUTER.LISTENING + ROUTER.CREATE_PLAYLIST)}>
        Create playlist
      </Button>
    </Box>
  );
}
