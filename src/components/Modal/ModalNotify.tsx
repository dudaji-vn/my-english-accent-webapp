import { Box, Button, Modal, Typography } from '@mui/material'

interface Props {
    isShow: boolean;
    toggle: () => void;
    children: React.ReactNode;
}

export default function ModalNotify({isShow, toggle, children } : Props) {
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
            {children}
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
