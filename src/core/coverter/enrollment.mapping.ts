import { EnrollmentModal, EnrollmentResponseType } from "../type/enrollment.type";

export const enrollmentConvert = (id: string, enrollment: EnrollmentModal): EnrollmentResponseType => {
  return {
    enrollmentId: id,
    created: enrollment.created,
    currentStep: enrollment.current_step,
    lectureId: enrollment.lecture_id,
    stage: enrollment.stage,
    updated: enrollment.updated,
    userId: enrollment.user_id,
    totalStep: 0,
  };
};
