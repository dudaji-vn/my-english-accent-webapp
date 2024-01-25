import RankingIcon from "@/assets/icon/ranking.svg";
import { Button, Typography } from "@mui/material";
import LeaderTable from "./LeaderTable";
import ArrowDownIcon from "@/components/icons/arrow-down-icon";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";

const LeaderBoard = () => {
  const navigate = useNavigate();
  const listUsers = [
    {
      rank: 1,
      nickName: "Lora jdjdjd djdjdj ",
      nativeLanguage: "vn",
      score: 500,
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
    },
    {
      rank: 2,
      score: 400,
      nickName: "Hao",
      nativeLanguage: "vn",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
    },
    {
      rank: 3,
      score: 300,
      nickName: "Nhi",
      nativeLanguage: "vn",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
    },
  ];
  const myBoard = {
    score: 10,
    rank: 22,
    nickName: "Linh",
    nativeLanguage: "vn",
    avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
  };

  Array.from(Array(10).keys()).map((item) => {
    listUsers.push({
      score: item + 100,
      rank: item + 4,
      nickName: `Test ${item}`,
      nativeLanguage: "vn",
      avatarUrl: "https://lh3.googleusercontent.com/a/ACg8ocKvUL-nmfluws7Zezcv5hlCio571QBrCm4v5JoV2OyE=s96-c",
    });
  });
  if (false && 1 + 1 === 2) {
    return (
      <div className="px-4 py-16 flex flex-col items-center text-center">
        <img className="mb-6" alt="" src={RankingIcon} />
        <Typography className="text-xl font-semibold mb-2">Leaderboards</Typography>
        <Typography className="mb-6">Complete recording 1 Lecture to start competing on Leaderboards</Typography>
        <Button onClick={() => navigate(ROUTER.RECORD)} className="py-[10px] px-6 rounded-2xl text-base" variant="contained">
          Start a Lecture
        </Button>
      </div>
    );
  }
  return (
    <div className="px-4 py-6 flex flex-col items-center">
      <img className="mb-6" alt="" src={RankingIcon} />
      <Typography className="text-xl font-semibold mb-2">Leaderboards</Typography>
      <Typography className="mb-6">Top 3 users in this week</Typography>
      <LeaderTable data={listUsers.slice(0, 3)} />
      <div className="flex gap-4 items-center justify-center py-6 px-4">
        <ArrowDownIcon />
        <Typography className="text-secondary font-semibold">Promotion Zone</Typography>
        <ArrowDownIcon />
      </div>
      <LeaderTable data={listUsers.slice(3, 10)} />

      {myBoard.rank > 10 && (
        <>
          <div className="flex gap-4 items-center justify-center py-6 px-4">
            <ArrowDownIcon />
            <Typography className="text-secondary font-semibold">My ranking</Typography>
            <ArrowDownIcon />
          </div>

          <LeaderTable data={[myBoard]} />
        </>
      )}
    </div>
  );
};

export default LeaderBoard;
