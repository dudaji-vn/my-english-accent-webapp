import React from "react";
import { Box, Avatar, Typography, Container } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category, { CategoryPropType } from "@/components/Category";
export default function RecordingPage() {
  const categoryList: CategoryPropType[] = [
    {
      categoryName: "In progress",
      categoryItems: [
        {
          categoryItemName: "General",
          progressNumber: 6,
        },
      ],
    },
    {
      categoryName: "Explore",
      categoryItems: [
        {
          categoryItemName: "Product Development",
          progressNumber: 6,
        },
        {
          categoryItemName: "Product design",
          progressNumber: 6,
        },
      ],
    },
  ];

  const renderCategory = () => {
    return categoryList.map((category: CategoryPropType) => {
      return (
        <Category
          categoryName={category.categoryName}
          categoryItems={category.categoryItems}
        />
      );
    });
  };

  return (
    <Box className="bg-white">
      <Box className="p-4 flex items-center gap-2">
        <Avatar src={ChevronIcon} sx={{ width: "1.5rem", height: "1.5rem" }} />
        <Typography className="text-large-semibold">
          Practice pronunciation
        </Typography>
      </Box>
      {renderCategory()}
    </Box>
  );
}
