import { Box, Typography, Avatar } from "@mui/material";
import GalleryIcon from "@/assets/icon/gallery-icon.svg";

export interface CategoryItemPropType {
  categoryItemName: string;
  progressNumber: number;
}

export default function CategoryItem({
  categoryItemName,
  progressNumber,
}: CategoryItemPropType) {
  return (
    <Box
      className="p-4 flex justify-between items-end mb-4 last:mb-0"
      sx={{
        boxShadow: "0px 1px 3px 0px #A6AFC366",
        borderRadius: "0.5rem",
      }}
    >
      <Box>
        <Typography className="text-base-semibold">
          {categoryItemName}
        </Typography>
        <Typography className="text-extra-small-regular">
          {progressNumber} phrases
        </Typography>
      </Box>
      <Avatar
        src={GalleryIcon}
        alt="gallery-icon"
        sx={{ width: "1.5rem", height: "1.5rem" }}
      />
    </Box>
  );
}
