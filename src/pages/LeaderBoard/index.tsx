import RankingIcon from "@/assets/icon/ranking.svg";
import GoldMedalIcon from "@/assets/icon/gold-medal-icon.svg";
import SilverMedalIcon from "@/assets/icon/silver-medal-icon.svg";
import BronzeMedalIcon from "@/assets/icon/bronze-medal-icon.svg";

import { Typography } from "@mui/material";
import { useMemo } from "react";

const LeaderBoard = () => {
  const renderMedal = (ranking: number) => {
    const rankingMapping: { [key: number]: string } = {
      1: GoldMedalIcon,
      2: SilverMedalIcon,
      3: BronzeMedalIcon,
    };
    if (ranking < 0) {
      return -1;
    }
    if (ranking > 3) {
      return ranking;
    }

    return <img src={rankingMapping[ranking]} alt="" />;
  };
  const listUsers = [
    {
      rank: 1,
      nickName: "Linh",
      nativeLanguage: "vn",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
    },
    {
      rank: 2,
      nickName: "Hao",
      nativeLanguage: "vn",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
    },
  ];
  Array.from(Array(10).keys()).map((item) => {
    listUsers.push({
      rank: item + 3,
      nickName: `Test ${item}`,
      nativeLanguage: "vn",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
    });
  });
  return (
    <div className="px-4 py-6 flex flex-col items-center">
      <img className="mb-6" alt="" src={RankingIcon} />
      <Typography className="mb-2">Leaderboards</Typography>
      <Typography>Top 3 users in this week</Typography>
      {listUsers.splice(0, 3).map((item, index) => {
        return (
          <div>
            {renderMedal(item.rank)}
            {item.nickName}
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoard;
