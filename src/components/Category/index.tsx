import { Box, Typography } from "@mui/material";
import CategoryItem from "@/components/Category/CategoryItem";
import { nanoid } from "@reduxjs/toolkit";
import { StageExercise, StageLabel, TopicUIType } from "@/shared/type";
import { EnrollmentResponseType, LectureResponseType } from "@/core/type";

export interface CategoryPropType {
  stage: StageExercise;
  lectureItems: (LectureResponseType & EnrollmentResponseType)[];
}

export default function Category({ stage, lectureItems }: CategoryPropType) {
  const renderCategoryItem = () => {
    return lectureItems.map((item) => (
      <Box className='mb-4 last:mb-0' key={item.enrollmentId}>
        <CategoryItem {...item} />
      </Box>
    ));
  };

  return (
    <Box className='p-4'>
      <Typography className='pb-4 text-large-semibold'>{StageLabel[stage]}</Typography>
      {renderCategoryItem()}
    </Box>
  );
}
