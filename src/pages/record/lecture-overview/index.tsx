import CheckIcon from "@/components/icons/check-icon";
import LectureIcon from "@/components/icons/lecture-icon";
import ScoreIcon from "@/components/icons/score-icon";
import { VocabularyTypeWithNativeLanguageResponse } from "@/core/type";
import { SentenceStatus, StageExercise } from "@/shared/type";
import { Box, Button, Typography } from "@mui/material";

interface ILectureOverviewProps {
  data: {
    lectureName: string;
    currentStep: number;
    totalStep: number;
    totalPoint: number;
    imageUrl: string;
    stage: StageExercise;
    sentences: VocabularyTypeWithNativeLanguageResponse[];
  };
  onPractice: () => void;
}
const LectureOverview = (props: ILectureOverviewProps) => {
  const { lectureName, currentStep, totalPoint, totalStep, imageUrl, stage, sentences } = props.data;

  return (
    <Box className="flex flex-col items-center">
      <Box
        sx={{
          maxWidth: "calc(100% - 32px)",
        }}
        className="w-[600px] m-4 p-4 shadow-xl rounded-2xl bg-white"
      >
        <Box className="flex flex-col items-center">
          <Box className="mb-4">
            <img className="h-16" src={imageUrl} alt="" />
          </Box>
          <Typography className="text-base-semibold mb-4">{lectureName}</Typography>
          <Box className="flex items-center gap-6 mb-10">
            <Box className="flex items-center gap-1">
              <LectureIcon />
              <Typography className="text-extra-small-regular">
                {stage !== StageExercise.Open ? `${currentStep}/${totalStep} sentences` : `${totalStep} sentences`}
              </Typography>
            </Box>
            <Box className="flex items-center gap-1">
              <ScoreIcon type="outline" />
              <Typography className="text-extra-small-regular">
                {stage !== StageExercise.Open ? `${totalPoint}/${totalStep} points` : `${totalStep} points`}
              </Typography>
            </Box>
          </Box>

          <Box>
            {totalStep > 7 && (
              <Button onClick={props.onPractice} className="py-[10px] px-6 rounded-2xl text-base mb-4" variant="contained">
                {stage === StageExercise.Open
                  ? "Start speaking"
                  : stage === StageExercise.Inprogress
                  ? "Continue speaking"
                  : "Practice again"}
              </Button>
            )}
          </Box>
        </Box>

        <Box>
          {sentences.map((item) => {
            return (
              <Box
                className="p-4 border-solid border-0 border-b border-[#CBD5E1] flex items-center justify-between"
                key={item.vocabularyId}
              >
                <Typography
                  sx={{
                    color:
                      item.status === SentenceStatus.Pass
                        ? "#34D399"
                        : item.status === SentenceStatus.NotPass
                        ? "#EF4444"
                        : "#6B7280",
                  }}
                >
                  {item.vtitleDisplayLanguage}
                </Typography>
                <Box className="w-5 h-5 ml-2">
                  <CheckIcon
                    status={
                      item.status === SentenceStatus.Pass
                        ? "success"
                        : item.status === SentenceStatus.NotPass
                        ? "error"
                        : "normal"
                    }
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
        <Box className="text-center mt-10 mb-6">
          <Button onClick={props.onPractice} className="py-[10px] px-6 rounded-2xl text-base" variant="contained">
            {stage === StageExercise.Open
              ? "Start speaking"
              : stage === StageExercise.Inprogress
              ? "Continue speaking"
              : "Practice again"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LectureOverview;
