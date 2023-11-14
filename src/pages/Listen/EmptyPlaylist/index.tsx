import { Avatar, Box, Button, Typography } from "@mui/material";
import WaveIcon from "@/assets/icon/wave-icon.svg";
export default function ListenEmptyPlaylistPage() {
  return (
    <Box className='flex flex-col grow items-center gap-6 justify-center p-4' sx={{ minHeight: (theme) => `calc(100% - ${theme.mixins.toolbar.minHeight}px)` }}>
      <Avatar src={WaveIcon} alt='wave-icon' className='w-16 h-16' />
      <Box className='text-center'>
        <Typography className='text-large-semibold'>Empty playlist</Typography>
        <Typography variant='body2'>Let's choose your favorite lecture and listen to your colleague english accent</Typography>
      </Box>
      <Button variant='contained'>Create playlist</Button>
    </Box>
  );
}
