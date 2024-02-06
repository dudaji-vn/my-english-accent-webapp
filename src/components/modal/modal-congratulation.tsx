import { Box, Typography } from "@mui/material";
import ModalNotify from "./modal-notify";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { toggleModal } from "@/core/store/index";
import { ModalType } from "@/shared/const/modal-type.const";

export default function ModalCongratulation() {
  const { type } = useAppSelector((state) => state.GlobalStore.modal);
  const dispatch = useAppDispatch();
  const handleToggleModal = () => {
    dispatch(toggleModal());
  };
  return (
    <ModalNotify isShow={type === ModalType.CONGRATULATION} toggle={handleToggleModal}>
      <Box className="w-20 h-20">
        <img src="/images/congratulation.svg" alt="Congratulation" />
      </Box>
      <Typography className="text-extra-large-semibold">Congratulation</Typography>
      <Typography mt={1}>
        You have finally completed recording 10 lectures. We'll send <strong>the survey</strong> to your email. Please check your
        inbox or spam for further information
      </Typography>
    </ModalNotify>
  );
}
