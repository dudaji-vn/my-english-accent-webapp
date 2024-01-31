import { DocumentReference } from "firebase/firestore";
import { StageExercise } from "@/shared/type";

export interface EnrollmentResponseType {
  lectureId: DocumentReference;
  userId: DocumentReference;
  stage: StageExercise;
  currentStep: number;
  updated: string;
  created: string;
  enrollmentId: string;
  totalStep: number;
  totalPoint: number;
}

export interface EnrollmentModal {
  enrollment_id: string;
  user_id: DocumentReference;
  lecture_id: DocumentReference;
  stage: StageExercise;
  current_step: number;
  updated: string;
  created: string;
}

export interface EnrollmentRequest {
  enrollmentId?: string;
  lectureId: string;
}

export interface EnrollmentStep {
  lectureId: string;
  enrollmentId: string;
  currentStep: number;
  stage: number;
}
