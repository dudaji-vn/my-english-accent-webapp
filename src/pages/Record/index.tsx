import React, { useEffect } from "react";
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronIcon from "@/assets/icon/chevron-left-icon.svg";
import Category from "@/components/Category";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";
import { dummyExercise } from "@/config/dummyData";
import { groupBy } from "@/shared/utils/groupBy.util";
import { StageExercise } from "@/shared/type";
import ROUTER from "@/shared/const/router.const";
import {
  useGetRecordsQuery,
  useGetTopicsQuery,
  useGetVocabulariesQuery,
} from "@/core/services";

import * as _ from "lodash";

export default function RecordingPage() {
  const goBack = useNavigate();
  const dataDummy = groupBy(dummyExercise, "stage");

  const { data: dataTopic, isLoading: isTopicFetching } = useGetTopicsQuery();

  useEffect(() => {
    // console.log("dataRecord", dataRecord);
    // let progress = {
    //   stage: StageExercise.Open,
    //   currentPhrase: 0,
    // };
    // if (_.isEmpty(dataRecord)) {
    //   progress = {
    //     stage: StageExercise.Open,
    //     currentPhrase: 0,
    //   };
    // } else {
    //   console.log("dataRecord");
    // }
    // const populated = _.chain(dataVocabulary)
    //   .groupBy("topicId")
    //   .map((value, key) => {
    //     return { topicId: key, vocabulary: value };
    //   })
    //   .value();
    // const mergeArry = _.merge(populated, dataTopic);
    // console.log(mergeArry);
  }, [isTopicFetching]);

  // console.log(dataRecord);
  // const renderCategory = () => {
  //   return dataTopic.map((value: any) => {
  //     return (
  //       <Category
  //         key={value.topicId}
  //         stage={StageExercise.Open}
  //         categoryItems={value}
  //       />
  //     );
  //   });
  // };

  return (
    <Box>
      <Box className="p-4 flex items-center gap-2 divider bg-white">
        <IconButton onClick={() => goBack(ROUTER.ROOT)}>
          <Avatar src={ChevronIcon} className="w-6 h-6" />
        </IconButton>
        <Typography className="text-large-semibold">
          Practice pronounciation
        </Typography>
      </Box>
      {/* {renderCategory()} */}
    </Box>
  );
}
