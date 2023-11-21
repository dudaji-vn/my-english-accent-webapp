import { Box, Button, Typography } from "@mui/material";
import { ReactNode } from "react";

interface FooterCardType {
  onClick?: () => void;
  classes?: string;
  children: ReactNode;
}
export default function FooterCard(props: FooterCardType) {
  return (
    <Box
      className={`flex sticky bottom-0 w-full gap-4 p-6 bg-white border-solid border-stroke border-0 border-t-[1px] z-10 ${props.classes}`}
    >
      {props.children}
    </Box>
  );
}
