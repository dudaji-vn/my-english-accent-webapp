import { Box, Typography } from "@mui/material";

import { useLocation } from "react-router-dom";
import WordTag from "@/components/WordTag";
import { useGetRecordQuery } from "@/core/services";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import _ from "lodash";
import { useEffect } from "react";
import { saveNumberRecords } from "@/store/ListenPageStore";

export default function IndividualPage() {
  const search = useLocation();
  const userId = search.search.replace("?", "");
  const topicId = useAppSelector((state) => state.listenPage.topicId);
  const { data } = useGetRecordQuery(
    { userId: userId, topicId },
    {
      refetchOnFocus: true,
    }
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (_.isEmpty(data) || _.isEmpty(userId)) {
      dispatch(saveNumberRecords(0));
    } else {
      dispatch(saveNumberRecords(data.length));
    }
  }, [data]);

  if (_.isEmpty(data) || _.isEmpty(userId)) return <Typography>There's no records</Typography>;
  // const renderWords = () => {
  //   return data.map((word: any) => (
  //     <WordTag
  //       recordId='1'
  //       lectureId='1'
  //       lectureName='1'
  //       key={word.recordId}
  //       sentence={word.vocabularyTitleDisplayLanguage}
  //       phonetic={word.vocabularyIpaDisplayLanguage}
  //       voiceSrc={word.recordVoiceSrc}
  //       vocabularyId={word.vocabularyId}
  //       classes='divider last:rounded-b-lg'
  //     />
  //   ));
  // };
  return <Box>{''}</Box>;
}
