import { Avatar, Box, Typography } from "@mui/material";
import { StageExercise, StageLabel } from "@/shared/type";

import * as _ from "lodash";
import { useGetLecturesByQuery } from "@/core/services";
import { useState } from "react";
import Lecture from "@/components/Lecture";
import BoxCard from "@/components/BoxCard";
import TabCustom from "@/components/TabCustom";
import Loading from "@/components/Loading";
import RecordEmptyIcon from "@/assets/icon/record-empty-icon.svg";

export default function RecordingPage() {
  const stageList = Object.values(StageLabel);
  const [stage, setStage] = useState<StageExercise>(StageExercise.Open);
  const { data, isFetching } = useGetLecturesByQuery(stage);

  const handleChange = (newStage: number) => {
    setStage(() => newStage);
  };

  if (_.isNull(data) || _.isUndefined(data)) return <></>;

  const renderLectures = () => {
    if (data.length == 0)
      return (
        <Box className='flex flex-col gap-2 items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <img src={RecordEmptyIcon} />
          <Typography className='text-extra-large-semibold mt-4'>Empty record</Typography>
          <Typography className='text-base-regular w-48 text-center' variant='body2'>
            You haven't recorded any lecture yet
          </Typography>
        </Box>
      );

    return data.map((item) => (
      <BoxCard classes='basis-1/4 grow sm:max-w-[25%] mb-4 sm:mb-0' key={item.lectureId}>
        <Lecture {...item} />
      </BoxCard>
    ));
  };

  if (isFetching) return <Loading />;

  return (
    <Box className='p-4'>
      <TabCustom tab={stageList} callback={handleChange} tabIndex={stage} />
      <Box className='sm:flex sm:flex-wrap gap-4 mt-4'>{renderLectures()}</Box>
    </Box>
  );
}
