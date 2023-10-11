import React from "react";
import { Box, Typography } from "@mui/material";
import CategoryItem, {
  CategoryItemPropType,
} from "@/components/Category/CategoryItem";
import { nanoid } from "@reduxjs/toolkit";
import { StageExercise, StageLabel } from "@/shared/type";

export interface CategoryPropType {
  stage: StageExercise;
  categoryItems: CategoryItemPropType[];
}

export default function Category({ stage, categoryItems }: CategoryPropType) {
  const renderCategoryItem = () => {
    return categoryItems.map((item) => {
      return (
        <Box className="mb-4 last:mb-0" key={nanoid()}>
          <CategoryItem
            topicName={item.topicName}
            currentPhrase={item.currentPhrase}
            totalPhrase={item.totalPhrase}
            imgSrc={item.imgSrc}
            stage={item.stage}
            topicId={item.topicId}
          />
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
