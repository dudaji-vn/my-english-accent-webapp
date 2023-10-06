import React from "react";
import { Box, Typography } from "@mui/material";
import CategoryItem, {
  CategoryItemPropType,
} from "@/components/Category/CategoryItem";
import { nanoid } from "@reduxjs/toolkit";
import { ExerciseStage } from "@/shared/type";

export interface CategoryPropType {
  stage: string;
  categoryItems: CategoryItemPropType[];
}

export default function Category({ stage, categoryItems }: CategoryPropType) {
  const renderCategoryItem = () => {
    return categoryItems.map((item) => {
      return (
        <Box className="mb-4 last:mb-0" key={nanoid()}>
          <CategoryItem
            title={item.title}
            currentPhrase={item.currentPhrase}
            totalPhrase={item.totalPhrase}
            categoryImg={item.categoryImg}
            stage={stage}
            id={item.id}
          />
        </Box>
      );
    });
  };

  const convertStage = () => {
    let label = "";
    switch (parseInt(stage)) {
      case ExerciseStage.Close:
        label = "Archived";
        break;
      case ExerciseStage.Inprogress:
        label = "In progress";

        break;
      case ExerciseStage.Open:
        label = "Explore";
        break;
    }
    return label;
  };

  return (
    <Box className="p-4">
      <Typography className="pb-4 text-large-semibold">
        {convertStage()}
      </Typography>
      {renderCategoryItem()}
    </Box>
  );
}
