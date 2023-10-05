import React, { Fragment } from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category, { CategoryPropType } from "@/components/Category";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

export default function RecordingPage() {
  const goBack = useNavigate();

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

  const renderCategory = () => {
    return categoryList.map((category: CategoryPropType) => {
      return (
        <Fragment key={nanoid()}>
          <Category
            categoryName={category.categoryName}
            categoryItems={category.categoryItems}
          />
        </Fragment>
      );
    });
  };

  return (
    <Box>
      <Box className="p-4 flex items-center gap-2 border-solid border-stroke border-0 border-b-[1px] bg-white">
        <IconButton onClick={() => goBack(-1)}>
          <Avatar src={ChevronIcon} className="w-6 h-6" />
        </IconButton>
        <Typography className="text-large-semibold">
          Practice pronounciation
        </Typography>
      </Box>
      {renderCategory()}
    </Box>
  );
}
