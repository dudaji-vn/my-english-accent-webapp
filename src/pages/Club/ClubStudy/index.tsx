import BoxCard from "@/components/BoxCard";
import { Container, Typography, Avatar, Box, Button } from "@mui/material";

import UserIcon from "@/assets/icon/user-icon.svg";
import ClockIcon from "@/assets/icon/clock-icon.svg";
import MessageIcon from "@/assets/icon/message-icon.svg";
export default function ClubStudyPage() {
  return (
    <Container className='mt-6 grow'>
      <BoxCard classes='p-4 flex flex-col gap-2'>
        <Typography className='text-base-semibold mb-8'>Terminology speaking practice</Typography>

        <Typography className='text-extra-small-regular flex gap-1' variant='body2'>
          <Avatar component={"span"} src={MessageIcon} alt='speaking-icon' className='w-4 h-4' />
          10 sentences
        </Typography>

        <Typography className='text-extra-small-regular flex gap-1' variant='body2'>
          <Avatar component={"span"} src={UserIcon} alt='speaking-icon' className='w-4 h-4' />5 members
        </Typography>

        <Typography className='text-extra-small-regular flex gap-1' variant='body2'>
          <Avatar component={"span"} src={ClockIcon} alt='speaking-icon' className='w-4 h-4' />
          Created 2 minuted ago
        </Typography>

        <Box className='flex justify-between gap-4 mt-4'>
          <Button className='bg-purple-50' variant='outlined' fullWidth>
            Record
          </Button>
          <Button className='bg-purple-50' variant='outlined' fullWidth>
            Listen
          </Button>
        </Box>
      </BoxCard>
    </Container>
  );
}
