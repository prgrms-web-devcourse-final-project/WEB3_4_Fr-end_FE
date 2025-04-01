export type MateCardData = {
  id: number;
  title: string;
  description: string;
  recruitCount: number;
  region: string;
  thumbnailUrl: string;
  user: UserProfile;
  period: Period;
};

interface UserProfile {
  name: string;
  age: number;
  gender: string;
  imageUrl: string;
}

interface Period {
  startDate: string;
  endDate: string;
  durationText: string;
}
