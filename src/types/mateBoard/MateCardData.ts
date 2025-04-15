export interface PostLike {
  authorId: number;
  matePostId: number;
}

export type MateCardData = {
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
  imageUrl: string | null;
  bio: string | null;
  commentCount: number;
  likeCount: number;
  postLike: PostLike[];
};
