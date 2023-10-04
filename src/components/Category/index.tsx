import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import CategoryItem, { CategoryItemPropType } from "./CategoryItem";

export interface CategoryPropType {
  categoryName: string;
  categoryItems: CategoryItemPropType[];
}

export default function Category({
  categoryName,
  categoryItems,
}: CategoryPropType) {
  const renderCategoryItem = () => {
    return categoryItems.map((item) => {
      return (
        <CategoryItem
          categoryItemName={item.categoryItemName}
          progressNumber={item.progressNumber}
        />
      );
    });
  };
  return (
    <Box className="p-4">
      <Typography className="pb-4 text-large-semibold">
        {categoryName}
      </Typography>
      {renderCategoryItem()}
    </Box>
  );
}
