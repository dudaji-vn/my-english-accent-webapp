import { ExerciseStage, ExerciseType } from "@/shared/type";
import { nanoid } from "@reduxjs/toolkit";

const exerciseDummy: ExerciseType[] = [
  {
    stage: ExerciseStage.Inprogress,
    imgSrc: "",
    title: "General",
    currentPhrase: 2,
    totalPhrase: 6,
    phraseSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
    phrasePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    id: nanoid(),
  },
  {
    stage: ExerciseStage.Inprogress,
    imgSrc: "",
    title: "General1",
    currentPhrase: 2,
    totalPhrase: 6,
    phraseSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
    phrasePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    id: nanoid(),
  },
  {
    stage: ExerciseStage.Close,
    imgSrc: "",
    title: "Product Design",
    currentPhrase: 2,
    totalPhrase: 6,
    phraseSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
    phrasePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    id: nanoid(),
  },
  {
    stage: ExerciseStage.Close,
    imgSrc: "",
    title: "Product Design1",
    currentPhrase: 2,
    totalPhrase: 6,
    phraseSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
    phrasePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    id: nanoid(),
  },
  {
    stage: ExerciseStage.Open,
    imgSrc: "",
    title: "Product Development",
    currentPhrase: 2,
    totalPhrase: 6,
    phraseSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
    phrasePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    id: nanoid(),
  },
  {
    stage: ExerciseStage.Open,
    imgSrc: "",
    title: "Product Development1",
    currentPhrase: 2,
    totalPhrase: 6,
    phraseSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
    phrasePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    id: nanoid(),
  },
];

export { exerciseDummy };
