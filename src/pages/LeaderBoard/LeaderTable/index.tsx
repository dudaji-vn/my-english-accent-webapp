import BronzeMedalIcon from "@/assets/icon/bronze-medal-icon.svg";
import GoldMedalIcon from "@/assets/icon/gold-medal-icon.svg";
import SilverMedalIcon from "@/assets/icon/silver-medal-icon.svg";
import KoreanFlagIcon from "@/components/icons/korean-flag-icon";
import ScoreIcon from "@/components/icons/score-icon";
import VietNamFlagIcon from "@/components/icons/vietnam-flag-icon";
import ROUTER from "@/shared/const/router.const";
import { Avatar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
interface ILeaderTableProps {
  data: any[];
}
const LeaderTable = (props: ILeaderTableProps) => {
  const navigate = useNavigate();
  const renderMedal = (ranking: number) => {
    if (ranking <= 0) {
      return;
    }
    if (ranking > 3) {
      return ranking;
    }

    const rankingMapping: { [key: number]: string } = {
      1: GoldMedalIcon,
      2: SilverMedalIcon,
      3: BronzeMedalIcon,
    };

    return <img src={rankingMapping[ranking]} alt="" />;
  };
  const { data } = props;
  const handleGotoLeaderBoardUser = () => {
    navigate(`${ROUTER.LEADER_BOARD}/82736730`);
  };
  return (
    <div className="w-[90vw] md:w-[50vw] bg-white rounded-2xl shadow-md">
      {data.map((item, index) => {
        return (
          <div
            onClick={handleGotoLeaderBoardUser}
            className="hover:bg-gray-100 cursor-pointer flex justify-between px-4 py-3 border-solid border-0 border-b border-[#CBD5E1] last:border-b-0 "
          >
            <div className="flex items-center gap-2 pl-2">
              {renderMedal(item.ranking)}
              <div className="relative">
                <Avatar sx={{ width: 36, height: 36 }} src={item.avatarUrl} />
                <div className="absolute -bottom-3 -right-1">
                  {item.nativeLanguage === "kr" ? <KoreanFlagIcon /> : <VietNamFlagIcon />}
                </div>
              </div>
              <Typography
                sx={{
                  wordBreak: "break-word",
                }}
                className="mx-1 break-words"
              >
                {item.nickName}
              </Typography>
            </div>
            <div className="flex items-center gap-1">
              <ScoreIcon type="fill" />
              {item.totalScore}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderTable;
