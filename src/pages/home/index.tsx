import LectureIcon from "@/components/icons/lecture-icon";
import ScoreIcon from "@/components/icons/score-icon";
import Loading from "@/components/loading";
import { useGetSummaryQuery } from "@/core/services";
import ROUTER from "@/shared/const/router.const";
import { Box, Button, Typography } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";

export default function HomePage() {
  const { data: userSummary, isLoading } = useGetSummaryQuery();
  const navigate = useNavigate();
  const gotoRecordProgressPage = () => {
    if (!userSummary) {
      return;
    }
    if (!userSummary.resumeLecture) {
      navigate(ROUTER.RECORD);
      return;
    }
    navigate({
      pathname: ROUTER.RECORD + `/${encodeURIComponent(userSummary.resumeLecture.lectureName)}`,
      search: `?${createSearchParams({ lectureId: userSummary.resumeLecture.lectureId } as any)}`,
    });
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box className="m-6 mb-20 bg-white rounded-2xl shadow-md">
      <Box className="p-6 border-solid border-0 border-b border-[#CBD5E1]">
        <Typography className="text-lg font-semibold mb-2">Practice speaking</Typography>
        <Typography className="mb-6">
          Complete a lecture to practice your English speaking skills and compete against other TechTalkers in Leaderboards.
        </Typography>
        <Button
          onClick={gotoRecordProgressPage}
          className="bg-[#E8DEF8] shadow-sm text-textPrimary rounded-2xl px-4 hover:opacity-80 w-full md:w-fit"
        >
          {userSummary?.resumeLecture ? "Resume Lecture" : "Start a lecture"}
        </Button>
        {userSummary?.resumeLecture && (
          <Box
            onClick={gotoRecordProgressPage}
            className="flex items-center cursor-pointer hover:shadow-xl border border-[#CBD5E1] border-solid w-fit p-4 rounded-lg mt-6 max-w-[600px]"
          >
            <Box className="mr-4">
              <img className="h-16" src={userSummary.resumeLecture.lectureImgSrc} alt="" />
            </Box>
            <Box className="flex flex-col gap-2">
              <Typography className="text-base-semibold">{userSummary.resumeLecture.lectureName}</Typography>
              <Box className="flex items-center gap-6 ">
                <Box className="flex items-center gap-1">
                  <LectureIcon />
                  <Typography className="text-extra-small-regular">{`${userSummary.resumeLecture.currentStep}/${userSummary.resumeLecture.totalSentences} sentences`}</Typography>
                </Box>
                <Box className="flex items-center gap-1">
                  <ScoreIcon type="outline" />
                  <Typography className="text-extra-small-regular">{`${userSummary.resumeLecture.point}/${userSummary.resumeLecture.totalPoint} points`}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
      <Box className="p-6 border-solid border-0 border-b border-[#CBD5E1]">
        <Typography className="text-lg font-semibold mb-2">Build vocabulary</Typography>
        <Typography className="mb-6">
          Practice words and sentences where you have spoken incorrectly during the lectures
        </Typography>
        <Box className="flex flex-col md:flex-row md:items-center gap-6">
          <Button disabled variant="contained" className="shadow-sm text-textPrimary rounded-2xl px-4 w-fit">
            Start now
          </Button>
          <Box className="flex">
            <Typography className="font-semibold mr-2">0</Typography>
            <Typography className="border-solid border-0 border-l pl-2 border-[#CBD5E1]">
              incorrect words and sentences
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className="p-6">
        <Typography className="text-lg font-semibold mb-2">TechTalk Certificates</Typography>
        <Typography className="mb-6">Gain credibility and show off your English speaking skills through a test.</Typography>
        <Box className="flex flex-col md:flex-row md:items-center gap-6">
          <Button
            onClick={() => navigate(ROUTER.CERTIFICATE)}
            className="bg-[#E8DEF8] shadow-sm text-textPrimary rounded-2xl px-4 hover:opacity-80 w-fit "
          >
            Start a certificate
          </Button>
          <Box className="flex items-center">
            {userSummary?.totalArchivedCertificate && userSummary.totalCertificate && (
              <Typography className="font-semibold mr-2">
                {userSummary?.totalArchivedCertificate}/{userSummary?.totalCertificate}
              </Typography>
            )}
            <Typography className="border-solid border-0 border-l pl-2 border-[#CBD5E1]">TechTalk certificates</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
