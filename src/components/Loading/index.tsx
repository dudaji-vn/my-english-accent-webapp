import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box className='flex justify-center m-5'>
      <CircularProgress />
    </Box>
  );
}
