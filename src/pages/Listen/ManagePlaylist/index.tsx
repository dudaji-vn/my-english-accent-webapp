import { Avatar, Box, Button, Container, IconButton, Step, StepLabel, Stepper, Typography } from "@mui/material";
import WaveIcon from "@/assets/icon/wave-icon.svg";
import CloseIcon from "@/assets/icon/close-icon.svg";

import { useNavigate } from "react-router-dom";
import React from "react";

const steps = ["Select lectures", "Select people"];

export default function ManagePlaylist() {
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box className='flex flex-col grow min-h-screen'>
      <Container className='py-4 divider '>
        <Box className='flex items-center gap-2'>
          <IconButton onClick={() => navigate(-1)}>
            <Avatar src={CloseIcon} className='w-6 h-6' />
          </IconButton>
          <Typography className='text-large-semibold'>Create playlist</Typography>
        </Box>
      </Container>

      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Box>
              <Box />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography>Step {activeStep + 1}</Typography>
            <Box>
              <Button color='inherit' disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Box />
              <Button onClick={handleNext}>{activeStep === steps.length - 1 ? "Finish" : "Next"}</Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
}
