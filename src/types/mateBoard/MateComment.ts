export interface MateComment {
  mateCommentId: number;
  matePostId: number;
  userId: number;
  nickname: string;
  profileImage?: string;
  content: string;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
}
