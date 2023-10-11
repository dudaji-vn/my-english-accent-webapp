import { ExerciseType, UserType, VocabularyType, StageExercise } from "../type";

export interface IRelationUserAndExercise extends ExerciseType {
  idUser: string;
}

export interface IRelationVocabularyAndExercise extends ExerciseType {
  idVocabulary: string[];
}

export const dummyUserInfor: UserType = {
  idUser: "id_user1",
  userName: "thien_dev",
  password: "123123",
  displayLanguage: "en",
  nativeLanguage: "vi",
};

export const dummyVocabulary: VocabularyType[] = [
  {
    idVocabulary: "id_vacabulary1",
    titlePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    titleSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin.",
    voiceSrc: "",
  },
  {
    idVocabulary: "id_vacabulary2",
    titlePrimaryLanguage:
      "Ngôn ngữ ban đầu của Anh, hiện được sử dụng ở nhiều nước khác và được sử dụng làm ngôn ngữ giao tiếp quốc tế trên toàn thế giới.",
    titleSecondaryLanguage:
      "The language, originally of England, now spoken in many other countries and used as a language of international communication throughout the world.",
    ipa: "ðə ˈlæŋɡwɪʤ, əˈrɪʤᵊnᵊli ɒv ˈɪŋɡlənd, naʊ ˈspəʊkᵊn ɪn ˈmɛni ˈʌðə ˈkʌntriz ænd juːzd æz ə ˈlæŋɡwɪʤ ɒv ˌɪntəˈnæʃᵊnᵊl kəˌmjuːnɪˈkeɪʃᵊn θruːˈaʊt ðə wɜːld.",
    voiceSrc: "",
  },
  {
    idVocabulary: "id_vacabulary3",
    titlePrimaryLanguage:
      "Một cách phát âm các từ của một ngôn ngữ cho biết một người đến từ quốc gia, khu vực hoặc tầng lớp xã hội nào; ai đó phát âm một ngôn ngữ cụ thể tốt như thế nào.",
    titleSecondaryLanguage:
      "A way of pronouncing the words of a language that shows which country, area or social class a person comes from; how well somebody pronounces a particular language.",
    ipa: "ə weɪ ɒv prəˈnaʊnsɪŋ ðə wɜːdz ɒv ə ˈlæŋɡwɪʤ ðæt ʃəʊz wɪʧ ˈkʌntri, ˈeəriə ɔː ˈsəʊʃᵊl klɑːs ə ˈpɜːsᵊn kʌmz frɒm; haʊ wɛl ˈsʌmbədi prəˈnaʊnsɪz ə pəˈtɪkjələ ˈlæŋɡwɪʤ.",
    voiceSrc: "",
  },
  {
    idVocabulary: "id_vacabulary4",
    titlePrimaryLanguage:
      "Vui lòng hủy chia sẻ màn hình của bạn, tôi sẽ chia sẻ màn hình của tôi.",
    titleSecondaryLanguage:
      "Please unshare your screen, I will share my screen.",
    ipa: "/pliz unshare jɔr skrin aɪ wɪl ʃɛr maɪ skrin/",
    voiceSrc: "",
  },
];

export const dummyExercise: IRelationVocabularyAndExercise[] = [
  {
    exerciseName: "General",
    imgSrc: "",
    idExercise: "id_exercise1",
    stage: StageExercise.Open,
    currentPhrase: 0,
    totalPhrase: 0,
    idVocabulary: ["id_vacabulary1"],
  },
  {
    exerciseName: "General 1",
    imgSrc: "",
    idExercise: "id_exercise2",
    stage: StageExercise.Inprogress,
    currentPhrase: 0,
    totalPhrase: 4,
    idVocabulary: [
      "id_vacabulary1",
      "id_vacabulary2",
      "id_vacabulary3",
      "id_vacabulary4",
    ],
  },
  {
    exerciseName: "General 2",
    imgSrc: "",
    idExercise: "id_exercise3",
    stage: StageExercise.Close,
    currentPhrase: 5,
    totalPhrase: 5,
    idVocabulary: ["id_vacabulary3"],
  },
  {
    exerciseName: "General 3",
    imgSrc: "",
    idExercise: "id_exercise4",
    stage: StageExercise.Close,
    currentPhrase: 3,
    totalPhrase: 3,
    idVocabulary: ["id_vacabulary2"],
  },
];

// const vocabulary = [
//   {
//     vocabulary_id: "vocabulary1",
//     lesson_category_id: "lessoncategory1",
//   },
//   {
//     vocabulary_id: "vocabulary2",
//     lesson_category_id: "lessoncategory1",
//   },
//   {
//     vocabulary_id: "vocabulary3",
//     lesson_category_id: "lessoncategory2",
//   },
//   {
//     vocabulary_id: "vocabulary4",
//     lesson_category_id: "lessoncategory2",
//   },
// ];

// const lessonCategory = [
//   {
//     lesson_category_id: "lessoncategory1",
//   },
//   {
//     lesson_category_id: "lessoncategory2",
//   },
// ];

// const user = [
//   {
//     user_id: "user1",
//   },
//   {
//     user_id: "user2",
//   },
// ];

// const enrollment = [
//   {
//     user_id: "user1",
//     lesson_category_id: "lessoncategory1",
//   },
//   {
//     user_id: "user1",
//     lesson_category_id: "lessoncategory2",
//   },
//   {
//     user_id: "user2",
//     lesson_category_id: "lessoncategory1",
//   },
//   {
//     user_id: "user2",
//     lesson_category_id: "lessoncategory2",
//   },
// ];

// const record = [
//   {
//     record_id: "record1",
//     vocabulary_id: "vocabulary1",
//     voice_src: "string",
//   },
//   {
//     record_id: "record2",
//     vocabulary_id: "vocabulary2",
//     voice_src: "string",
//   },
//   {
//     record_id: "record3",
//     vocabulary_id: "vocabulary3",
//     voice_src: "string",
//   },
//   {
//     record_id: "record4",
//     vocabulary_id: "vocabulary4",
//     voice_src: "string",
//   },
// ];


// const record1 = [
//   {
//     record_id: "record1",
//     vocabulary_id: "vocabulary1",
//     user_id: "user1",
//     voice_src: "string",
//   },
//   {
//     record_id: "record2",
//     vocabulary_id: "vocabulary2",
//     user_id: "user2",
//     voice_src: "string",
//   },
//   {
//     record_id: "record3",
//     vocabulary_id: "vocabulary3",
//     user_id: "user2",
//     voice_src: "string",
//   },
//   {
//     record_id: "record4",
//     vocabulary_id: "vocabulary4",
//     user_id: "user1",
//     voice_src: "string",
//   },
// ];