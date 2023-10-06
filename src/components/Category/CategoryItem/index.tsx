import { Box, Typography, Avatar, LinearProgress } from "@mui/material";
import BoxCard from "@/components/Card";
import { Route, useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";

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
  const navigate = useNavigate();
  const gotoRecordProgressPage = (id: string) => {
    const encode = encodeURI(id.toLowerCase());
    navigate(ROUTER.RECORD + `/${encode}`);
  };
  return (
    <BoxCard classes="bg-white p-4">
      <Box
        className="flex justify-between items-center"
        onClick={() => gotoRecordProgressPage(categoryItemName)}
      >
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
      <LinearProgress variant="determinate" value={50} />
    </BoxCard>
  );
}
