import { Box, Button, Typography } from "@mui/material";
import { FunctionComponent, ReactNode } from "react";

interface FooterBtn {
  onClick: ReactNode;
}
export default function FooterBtn(props: FooterBtn) {
  return (
    <Box className="flex fixed bottom-0 w-full p-6 bg-white border-solid border-stroke border-0 border-t-[1px]">
      <Button
        variant="contained"
        className="rounded-md m-auto"
        onClick={() => props.onClick}
      >
        <Typography className="text-base-medium" color={"white"}>
          Continue practice
        </Typography>
      </Button>
    </Box>
  );
}
