import { Box } from "@mui/material";
import { ReactElement, ReactNode } from "react";

export default function BoxCard({
  children,
  classes,
}: {
  children: ReactNode;
  classes?: string;
}) {
  return (
    <Box className={`shadow-[0_1px_3px_0px_#A6AFC366] rounded-lg bg-white ${classes}`}>
      {children}
    </Box>
  );
}
