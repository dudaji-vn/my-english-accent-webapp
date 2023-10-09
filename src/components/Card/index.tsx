import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function BoxCard({
  children,
  classes,
  onClick,
}: {
  children: ReactNode;
  classes?: string;
  onClick?: () => void;
}) {
  return (
    <Box
      onClick={onClick}
      className={`shadow-[0_1px_3px_0px_#A6AFC366] rounded-lg bg-white ${classes}`}
    >
      {children}
    </Box>
  );
}
