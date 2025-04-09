export interface MatePostResponse {
  id: number;
  title: string;
  content: string;
  recruitCount: number;
  travelRegion: string;
  travelStartDate: string;
  travelEndDate: string;
  mateGender: string;
  imageId?: number;
  travelEndDateValid: boolean;
}
