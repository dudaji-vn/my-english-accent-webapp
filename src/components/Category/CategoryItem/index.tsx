import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import BoxCard from "@/components/Card";

export interface CategoryItemPropType {
  categoryItemName: string;
  progressNumber: number;
  categoryImg: string;
}

export default function CategoryItem({
  categoryItemName,
  progressNumber,
  categoryImg,
}: CategoryItemPropType) {
  return (
    <BoxCard>
      <Box className="p-4 flex justify-between items-center">
        <Box>
          <Typography className="text-base-semibold">
            {categoryItemName}
          </Typography>
          <Typography className="text-extra-small-regular">
            {progressNumber} phrases
          </Typography>
        </Box>
        <Avatar src={categoryImg} alt="gallery-icon" className="w-6 h-6" />
      </Box>
      <Box className="px-4 pb-4">
        <LinearProgress variant="determinate" value={50} />
      </Box>
    </BoxCard>
  );
}
