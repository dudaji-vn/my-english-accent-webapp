import { StageExercise, StageLabel } from "@/shared/type";
import { Box, Typography } from "@mui/material";

import RecordEmptyIcon from "@/assets/icon/record-empty-icon.svg";
import BoxCard from "@/components/BoxCard";
import Lecture from "@/components/Lecture";
import Loading from "@/components/Loading";
import TabCustom from "@/components/TabCustom";
import { useGetLecturesByQuery } from "@/core/services";
import * as _ from "lodash";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { changeRecordTab } from "@/core/store/index";

export default function RecordingPage() {
  const stageList = Object.values(StageLabel);
  const [stage, setStage] = useState<StageExercise>(StageExercise.Open);
  const currentRecordTab = useAppSelector((state) => state.GlobalStore.currentRecordTab); 
  const { data, isFetching } = useGetLecturesByQuery(currentRecordTab || stage);
  const dispatch = useAppDispatch();
  
  const handleChange = (newStage: number) => {
    dispatch(changeRecordTab(newStage));
    setStage(() => newStage);
  };

  if (_.isNull(data) || _.isUndefined(data)) return <></>;

  const renderLectures = () => {
    if(isFetching) return <div className="w-full"><Loading /></div>
    if (data.length === 0)
      return (
        <Box className='flex flex-col gap-2 items-center w-full mt-10 md:mt-20'>
          <img src={RecordEmptyIcon} alt="Empty record"/>
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

  return (
    <Box className='p-4'>
      <TabCustom tab={stageList} callback={handleChange} tabIndex={currentRecordTab || stage} />
      <Box className='sm:flex sm:flex-wrap gap-4 mt-4'>{renderLectures()}</Box>
    </Box>
  );
}
