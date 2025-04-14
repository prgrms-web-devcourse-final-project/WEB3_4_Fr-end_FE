export interface MatePost {
  matePostId: number;
  authorId: number;
  title: string;
  content: string;
  travelRegion: string; 
  travelStartDate: string;
  travelEndDate: string;
  recruitmentStatus: "OPEN" | "CLOSED";
  mateGender: "MALE" | "FEMALE" | "NO_PREFERENCE";
  recruitCount: number;
  appliedCount: number;
  imageUrl: string;
  nickname: string;
  bio: string;
  profileImage: string;
  authorGender: "MALE" | "FEMALE";
  createdAt: string;
}
