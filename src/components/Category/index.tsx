import { Box, Typography } from "@mui/material";
import CategoryItem from "@/components/Category/CategoryItem";
import { nanoid } from "@reduxjs/toolkit";
import { StageExercise, StageLabel, TopicUIType } from "@/shared/type";
import { LectureResponseType } from "@/core/type";

export interface CategoryPropType {
  stage: StageExercise;
  lectureItems: any[];
}

export default function Category({ stage, lectureItems }: CategoryPropType) {
  const renderCategoryItem = () => {
    return lectureItems.map((item) => {
      console.log(item.lectureId.id);
      return (
        <Box className='mb-4 last:mb-0' key={nanoid()}>
          <CategoryItem
            {...{
              lectureName: item.lectureName,
              stage: item.stage,
              currentStep: item.currentStep,
              lectureId: item.lectureId.id,
              imgSrc: item.imgSrc,
            }}
          />
        </Box>
      );
    });
  };

  return (
    <Box className='p-4'>
      <Typography className='pb-4 text-large-semibold'>{StageLabel[stage]}</Typography>
      {renderCategoryItem()}
    </Box>
  );
}
