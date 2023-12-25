
import { Box, Typography } from '@mui/material'
import ModalNotify from './ModalNotify';
import { useAppDispatch, useAppSelector } from '@/core/store';
import { ModalType } from '@/shared/const/modal-type.const';
import { toggleModal } from '@/core/store/index';

export default function ModalMaxWinner() {
  const { type } = useAppSelector((state) => state.GlobalStore.modal);
  const dispatch = useAppDispatch();
  const handleToggleModal = () => {
    dispatch(toggleModal());
  }
  return (
    <ModalNotify isShow={type === ModalType.MAX_WINNER} toggle={handleToggleModal}>
      <Box className="w-20 h-20"><img src="/images/thankyou.svg" alt="Thank you" />
        <Typography className='text-extra-large-semibold'>Thanks for your interest!New annoucement!</Typography>
        <Typography mt={1} >We've ended the 'Record TechTalk's Lecture event.</Typography>
      </Box>
    </ModalNotify>
  )
}
