const lecturePath = "lecture";
const LectureController = {
  getLectures: () => {
    return {
      url: `/${lecturePath}/all`,
    };
  },
};

export default LectureController;
