import { Box, Typography } from "@mui/material";
import NoMemberIcon from "@/assets/icon/no-member-club-icon.svg";

export default function EmptyLecture({ classes }: { classes?: string }) {
  return (
    <Box className={`flex flex-col p-4 grow items-center justify-center bg-gray-100 gap-6 ${classes}`}>
      <Box>
        <img src={NoMemberIcon} alt='no-member-icon' />
      </Box>
      <Box className='text-center w-64'>
        <Typography className='text-base-semibold'>No members record yet</Typography>
        <Typography variant='body2'>Let's record the lectures and listen together.</Typography>
      </Box>
    </Box>
  );
}
