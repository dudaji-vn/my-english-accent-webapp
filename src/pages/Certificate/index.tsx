import { Avatar, Box, Typography } from "@mui/material";
import { StageExercise } from "../../shared/type";
import MedalIcon from "@/assets/icon/medal-icon.svg";
import MedalActiveIcon from "@/assets/icon/medal-color-icon.svg";
import { CertificateStatus } from "@/shared/type/certificate.type";
import BoxCard from "@/components/BoxCard";
import StarIcon from "@/assets/icon/star-icon.svg";
import StartActiveIcon from "@/assets/icon/start-color-icon.svg";
import { it } from "node:test";
import { createSearchParams, useNavigate } from "react-router-dom";
import ROUTER from "../../shared/const/router.const";
interface ICertificateItem {
  name: string;
  status: CertificateStatus;
  star: number;
  id: string;
}
const Certificate = () => {
  const navigate = useNavigate();
  const myCertificates: ICertificateItem[] = [
    {
      id: "111",
      name: "Level 1",
      status: CertificateStatus.NONE,
      star: 0,
    },
    {
      id: "222",
      name: "Level 2",
      status: CertificateStatus.ACHIEVED,
      star: 3,
    },
  ];
  const gotoCertificateProgressPage = (item: ICertificateItem) => {
    navigate({
      pathname: ROUTER.CERTIFICATE + `/${encodeURIComponent(item.name)}`,
      search: `?${createSearchParams({ id: item.id } as any)}`,
    });
  };
  return (
    <Box className="p-6 grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
      {myCertificates.map((item, index) => {
        return (
          <BoxCard
            onClick={() => gotoCertificateProgressPage(item)}
            classes="hover:shadow-xl cursor-pointer flex flex-col items-center px-6 pb-6"
          >
            <Avatar
              src={item.status === CertificateStatus.NONE ? MedalIcon : MedalActiveIcon}
              variant="square"
              alt="gallery-icon"
              className="w-20 h-20 mb-3"
            />
            <Box className="flex gap-5 items-center">
              {[1, 2, 3, 4, 5].map((star) => {
                return <Avatar className="w-5 h-5" variant="square" src={item.star < star ? StarIcon : StartActiveIcon} />;
              })}
            </Box>

            <Box className="flex flex-col items-center mt-6">
              <Typography className="text-base-semibold mb-9 ">{item.name}</Typography>
              <Typography className="text-base-semibold" color={"primary"}>
                {item.status === CertificateStatus.NONE ? "Test now" : "Test again"}
              </Typography>
            </Box>
          </BoxCard>
        );
      })}
    </Box>
  );
};

export default Certificate;
