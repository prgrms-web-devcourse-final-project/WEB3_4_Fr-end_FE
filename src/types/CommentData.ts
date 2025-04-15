export interface CommentData {
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
}

export type UniversalComment = CommentData | MateCommentPreview;

interface MateCommentPreview {
  title: string;
  content: string;
  author: string;
  avatar: string;
  date: string;
}
