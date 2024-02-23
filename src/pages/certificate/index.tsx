import { Avatar, Box, Typography } from "@mui/material";
import MedalIcon from "@/assets/icon/medal-icon.svg";
import MedalActiveIcon from "@/assets/icon/medal-color-icon.svg";
import { CertificateStatus } from "@/shared/type/certificate.type";
import BoxCard from "@/components/box-card";
import StarIcon from "@/assets/icon/star-icon.svg";
import StartActiveIcon from "@/assets/icon/start-color-icon.svg";
import { createSearchParams, useNavigate } from "react-router-dom";
import ROUTER from "@/shared/const/router.const";
import { useGetCertificateProgressQuery } from "../../core/services/certificate.service";
import Loading from "../../components/loading";
interface ICertificateItem {
  name: string;
  star: number;
  id: string;
}
const Certificate = () => {
  const navigate = useNavigate();
  const { data: myCertificates } = useGetCertificateProgressQuery();

  const gotoCertificateProgressPage = (item: ICertificateItem) => {
    navigate({
      pathname: ROUTER.CERTIFICATE + `/${encodeURIComponent(item.name)}`,
      search: `?${createSearchParams({ certificateId: item.id } as any)}`,
    });
  };
  if (!myCertificates) {
    return <Loading />;
  }
  return (
    <Box className="p-6 grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
      {myCertificates &&
        myCertificates.map((item, index) => {
          return (
            <BoxCard
              key={index}
              onClick={() => gotoCertificateProgressPage(item)}
              classes="hover:shadow-xl cursor-pointer flex flex-col items-center px-6 pb-6"
            >
              <Avatar
                src={item.star === 0 ? MedalIcon : MedalActiveIcon}
                variant="square"
                alt="gallery-icon"
                className="w-20 h-20 mb-3"
              />
              <Box className="flex gap-5 items-center">
                {[1, 2, 3, 4].map((star) => {
                  return (
                    <Avatar key={star} className="w-5 h-5" variant="square" src={item.star < star ? StarIcon : StartActiveIcon} />
                  );
                })}
              </Box>

              <Box className="flex flex-col items-center mt-6">
                <Typography className="text-base-semibold mb-8">{item.name}</Typography>

                <Typography className="text-center text-textSecondary font-semibold mb-9">
                  {item.star !== CertificateStatus.NONE
                    ? `Result: ${(item.score * 100) / item.totalScore}%`
                    : "Test to see your result"}
                </Typography>
                <Typography className="text-base-semibold" color={"primary"}>
                  {item.star === CertificateStatus.NONE ? "Test now" : "Test again"}
                </Typography>
              </Box>
            </BoxCard>
          );
        })}
    </Box>
  );
};

export default Certificate;
