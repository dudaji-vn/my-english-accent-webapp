import { Box, Typography } from '@mui/material'
import ModalNotify from './ModalNotify';

interface Props {
    isShow: boolean;
    toggle: () => void;
}

export default function ModalCongratulation(props: Props) {
    return (
        <ModalNotify {...props}>
            <Box className="w-20 h-20"><img src="/images/congratulation.svg" alt="Congratulation" /></Box>
            <Typography className='text-extra-large-semibold'>Congratulation</Typography>
            <Typography mt={1} >You have finally completed recording 10 lectures. We'll send <strong>the survey</strong> to your email. Please check your inbox or spam for further information</Typography>
        </ModalNotify>
    )
}
