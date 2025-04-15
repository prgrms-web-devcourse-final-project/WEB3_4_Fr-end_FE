interface PostLike {
  authorId: number;
  matePostId: number;
}

interface MateApplication {
  authorId: number;
  matePostId: number;
}
export type MateDetailData = {
  matePostId: number;
  authorId: number;
  nickname: string;
  profileImage: string | null;
  authorGender: string;
  title: string;
  content: string;
  travelRegion: string;
  travelStartDate: string;
  travelEndDate: string;
  recruitCount: number;
  appliedCount: number;
  recruitmentStatus: string;
  mateGender: string;
  createdAt: string;
  imageUrl: string;
  bio: string | null;
  postLike: PostLike[];
  mateApplications: MateApplication[];
};
