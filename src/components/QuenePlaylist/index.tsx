import { RecordTypeResponse, UserResponseType } from "@/core/type";
import { Box, Typography, Avatar } from "@mui/material";

interface QuenePlaylistProps {
  usersRecord: (UserResponseType & RecordTypeResponse & { isPlaying: boolean })[];
}
export default function QuenePlaylist({ usersRecord }: QuenePlaylistProps) {
  const userPlaying = usersRecord.find((user) => user.isPlaying);
  const indexUserPlaying = usersRecord.findIndex((user) => user.isPlaying);
  if (!userPlaying) return <Box className='h-10'></Box>;
  return (
    <Box className='px-4'>
      <Box className='flex gap-2 items-center bg-purple-50 p-2 px-4 rounded-lg'>
        <Typography className='text-small-medium'>{indexUserPlaying + 1}</Typography>
        <Avatar alt='avatar-icon' className='w-6 h-6'>
          <Typography className='text-small-regular text-white'>{userPlaying.nickName.slice(0, 1)}</Typography>
        </Avatar>
        <Typography className='text-small-medium'>{userPlaying.nickName}</Typography>
        <Typography className='text-extra-small-medium text-secondary'>{userPlaying.isPlaying ? "Speaking now" : null}</Typography>
      </Box>
    </Box>
  );
}
