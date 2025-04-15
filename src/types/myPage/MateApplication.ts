export interface MateApplication {
  applicationId: number;
  matePostId: number;
  mateTitle: string;
  mateContentPreview: string;
  writerNickname?: string;
  writerProfileImage?: string;
  applicantId: number;
  applicantNickname?: string;
  applicantProfileImage?: string;
  status: string;
}
