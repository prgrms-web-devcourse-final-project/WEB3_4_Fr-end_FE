export interface MateComment {
  mateCommentId: number;
  matePostId: number;
  authorId: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
}
