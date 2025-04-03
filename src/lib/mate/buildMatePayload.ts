import { DateRange } from "react-day-picker";

export function buildMatePayload(form: {
  title: string;
  location: string;
  dateRange?: DateRange;
  people: number;
  content: string;
  images?: File[];
  mateGender: string;
}) {
  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("travel_region", form.location);
  formData.append(
    "travel_start_date",
    form.dateRange?.from?.toISOString() ?? ""
  );
  formData.append("travel_end_date", form.dateRange?.to?.toISOString() ?? "");
  formData.append("content", form.content);
  formData.append("mate_gender", form.mateGender);
  form.images?.forEach((img) => formData.append("content_image", img));

  return formData;
}
