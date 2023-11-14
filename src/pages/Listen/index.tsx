import BlackPauseIcon from "@/assets/icon/black-pause-icon.svg";
import OptionIcon from "@/assets/icon/option-icon.svg";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

import PlaylistPod from "@/components/PlaylistPod";

export default function ListenPage() {
  return (
    <Box className='p-4'>
      <Box className='flex flex-col grow min-h-screen bg-white'>
        <Box className='flex justify-between p-4 divider'>
          <Box>
            <Typography className='text-base-medium'>My playlist</Typography>
            <Typography className='text-extra-small-regular' variant='body2'>
              3 lectures &#x2022; 22 people
            </Typography>
          </Box>
          <IconButton>
            <Avatar src={OptionIcon} alt='wave-icon' className='w-6 h-6' />
          </IconButton>
        </Box>

        <PlaylistPod />

        {/* active speaking */}
        <Box className='px-4'>
          <Box className='flex gap-2 items-center bg-purple-50 p-2 px-4 rounded-lg'>
            <Typography className='text-small-medium'>2</Typography>
            <Avatar alt='avatar-icon' className='w-6 h-6'>
              T
            </Avatar>
            <Typography className='text-small-medium'>thientran45</Typography>
            <Typography className='text-extra-small-medium text-secondary'>Speaking now</Typography>
          </Box>
        </Box>

        <Box className='p-4'>
          <Typography className='text-base-medium pb-4'>People</Typography>
          <Box className='divider py-2'>
            <Box className='flex gap-2 items-center'>
              <Avatar alt='avatar-icon' className='w-6 h-6' src={BlackPauseIcon} />
              <Avatar alt='avatar-icon' className='w-9 h-9'>
                T
              </Avatar>
              <Typography className='text-small-medium'>thientran45</Typography>
              <Typography className='text-extra-small-medium  text-secondary'>Speaking now</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
