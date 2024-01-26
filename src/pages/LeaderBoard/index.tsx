import RankingIcon from "@/assets/icon/ranking.svg";
import { Button, Typography } from "@mui/material";
import LeaderTable from "./LeaderTable";
import ArrowDownIcon from "@/components/icons/arrow-down-icon";
import { useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useGetUsersRankingQuery } from "@/core/services";
import Loading from "@/components/Loading";

const LeaderBoard = () => {
  const navigate = useNavigate();
  const { data: listUsers, isLoading } = useGetUsersRankingQuery();
  if (isLoading) {
    return <Loading />;
  }

  if (!listUsers) {
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
      {listUsers && listUsers.length > 3 && (
        <div>
          <div className="flex gap-4 items-center justify-center py-6 px-4">
            <ArrowDownIcon />
            <Typography className="text-secondary font-semibold">Promotion Zone</Typography>
            <ArrowDownIcon />
          </div>
          <LeaderTable data={listUsers.slice(3, listUsers.length)} />
        </div>
      )}
    </div>
  );
};

export default LeaderBoard;
