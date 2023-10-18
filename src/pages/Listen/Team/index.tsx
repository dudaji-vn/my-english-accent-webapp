import { Box, Typography } from "@mui/material";
import ParticipantCard from "@/components/ParticipantCard";
import { useGetRecordsQuery } from "@/core/services";
import persist from "@/shared/utils/persist.util";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { saveQuote, saveUserInfo } from "@/store/ListenPageStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import _ from "lodash";
import { UserType } from "@/shared/type";

export default function TeamPage() {
  const navigate = useNavigate();
  const listUser = persist.getMyInfo().favoriteUserIds;
  const topicId = useAppSelector((state) => state.listenPage.topicId);
  const { data } = useGetRecordsQuery({ usersId: listUser, topicId });
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector(
    (state) => state.listenPage.numberUsers.current
  );

  const onRedirectToUser = (user: UserType) => {
    dispatch(
      saveUserInfo({
        userName: user.userName,
        userId: user.userId,
        displayLanguage: user.displayLanguage,
        nativeLanguage: user.nativeLanguage,
      })
    );
    navigate({
      search: user.userId,
    });
  };

  useEffect(() => {
    if (_.isEmpty(data)) {
      dispatch(saveQuote(""));
    } else {
      dispatch(saveQuote(data[currentIndex].vocabularyTitleDisplayLanguage));
    }
  }, [data, currentIndex]);

  if (_.isEmpty(data)) return <Typography>No data</Typography>;
  const renderParticipant = () => {
    return data[currentIndex].records.map((value: any) => (
      <ParticipantCard
        key={value.recordId}
        voiceSrc={value.recordVoiceSrc}
        userInfo={{
          userName: value.userName,
          nativeLanguage: value.nativeLanguage,
        }}
        onClick={() => onRedirectToUser(value)}
      />
    ));
  };
  return <Box>{renderParticipant()}</Box>;
}
