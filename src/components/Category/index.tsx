import React from "react";
import { Box, Typography } from "@mui/material";
import CategoryItem, {
  CategoryItemPropType,
} from "@/components/Category/CategoryItem";

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
        <Box className="mb-4 last:mb-0">
          <CategoryItem
            categoryItemName={item.categoryItemName}
            progressNumber={item.progressNumber}
            categoryImg={item.categoryImg}
          />
        </Box>
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
