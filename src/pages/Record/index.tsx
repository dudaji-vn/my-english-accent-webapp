import React from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category, { CategoryPropType } from "@/components/Category";
import Recording from "@/components/TranslationCard";

export default function RecordingPage() {
  const categoryList: CategoryPropType[] = [
    {
      categoryName: "In progress",
      categoryItems: [
        {
          categoryItemName: "General",
          progressNumber: 6,
          categoryImg: "",
        },
      ],
    },
    {
      categoryName: "Explore",
      categoryItems: [
        {
          categoryItemName: "Product Development",
          progressNumber: 6,
          categoryImg: "",
        },
        {
          categoryItemName: "Product design",
          progressNumber: 6,
          categoryImg: "",
        },
      ],
    },
  ];

  const onBack = () => {
    console.log("back to home");
  };

  const renderCategory = () => {
    return categoryList.map((category: CategoryPropType) => {
      return (
        <>
          <Category
            categoryName={category.categoryName}
            categoryItems={category.categoryItems}
          />
        </>
      );
    });
  };

  return (
    <Box className="bg-white">
      {/* <Box className="p-4 flex items-center gap-2">
        <IconButton onClick={onBack}>
          <Avatar src={ChevronIcon} className="w-6 h-6" />
        </IconButton>
        <Typography className="text-large-semibold">
          Practice pronounciation
        </Typography>
      </Box>
      {renderCategory()} */}
      <Recording />
    </Box>
  );
}
