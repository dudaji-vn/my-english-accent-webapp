import { Box, Button, Modal, Typography } from '@mui/material'

interface Props {
    isShow: boolean;
    toggle: () => void;
}

export default function ModalAnnouncement({isShow, toggle}: Props) {
  return (
    <Modal open={isShow} onClose={toggle} aria-labelledby='modal-modal-title' aria-describedby='modal-modal-description'>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            background: "#FFF",
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            gap: "32px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Box className="w-20 h-20"><img src="/images/megaphone.svg" alt="Announcement"/></Box>
            <Typography className='text-extra-large-semibold'>New annoucement!</Typography>
            <Typography mt={1} >We've closed the 'Record TechTalk's Lecture event. Thank you for your interest.</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"center"}>
            <Button  variant='contained' color='primary' onClick={toggle}>
              Ok, I got it
            </Button>
          </Box>
        </Box>
      </Modal>
  )
}
