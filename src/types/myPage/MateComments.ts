export interface CommentData {
  mateCommentId: number;
  matePostId: number;
  matePostTitle: string;
  authorId: number;
  nickname: string;
  profileImageUrl: string;
  content: string;
  commentLike: {
    authorId: number;
    commentId: number;
  }[];
  createdAt: string;
  modifiedAt: string;
  likeCount: number;
}
