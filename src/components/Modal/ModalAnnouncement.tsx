import { Box, Typography } from '@mui/material'
import ModalNotify from './ModalNotify';
import { useAppDispatch, useAppSelector } from '@/core/store';
import { ModalType } from '@/shared/const/modal-type.const';
import { toggleModal } from '@/core/store/index';

export default function ModalAnnouncement() {
  const { type } = useAppSelector((state) => state.GlobalStore.modal);
  const dispatch = useAppDispatch();
  const handleToggleModal = () => {
    dispatch(toggleModal());
  }
  return (
    <ModalNotify isShow={type === ModalType.EVENT_END} toggle={handleToggleModal}>
      <Box className="w-20 h-20"><img src="/images/megaphone.svg" alt="Announcement" />
        <Typography className='text-extra-large-semibold'>New annoucement!</Typography>
        <Typography mt={1} >We've closed the 'Record TechTalk's Lecture event. Thank you for your interest.</Typography>
      </Box>
    </ModalNotify>
  )
}
