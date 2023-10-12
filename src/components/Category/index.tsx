import { Box, Typography } from "@mui/material";
import CategoryItem from "@/components/Category/CategoryItem";
import { nanoid } from "@reduxjs/toolkit";
import { StageExercise, StageLabel, TopicUIType } from "@/shared/type";

export interface CategoryPropType {
  stage: StageExercise;
  topicItems: TopicUIType[];
}

export default function Category({ stage, topicItems }: CategoryPropType) {
  const renderCategoryItem = () => {
    return topicItems.map((item) => {
      return (
        <Box className="mb-4 last:mb-0" key={nanoid()}>
          <CategoryItem {...item} />
        </Box>
      );
    });
  };

  return (
    <Box className="p-4">
      <Typography className="pb-4 text-large-semibold">
        {StageLabel[stage]}
      </Typography>
      {renderCategoryItem()}
    </Box>
  );
}
