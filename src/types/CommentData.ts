export interface CommentData {
  mateCommentId: number;
  matePostId: number;
  matePostTitle: string;
  authorId: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  createdAt: string; // ISO Date string
  modifiedAt: string;
}
