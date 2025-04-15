import { z } from "zod";
import { startOfToday } from "date-fns";

export const mateFormSchema = z.object({
  title: z.string().min(5, "제목은 최소 5글자").max(30, "제목은 30글자 이하"),
  dateRange: z
    .object({
      from: z.date({ required_error: "시작 날짜를 선택해주세요" }),
      to: z.date({ required_error: "종료 날짜를 선택해주세요" }),
    })
    .refine((range) => range.from && range.to, {
      message: "여행 시작 날짜와 종료 날짜를 모두 선택해주세요",
    })
    .refine((range) => !range.from || range.from >= startOfToday(), {
      message: "시작 날짜는 오늘 이후여야 합니다",
      path: ["from"],
    }),
  people: z
    .number({ required_error: "모집 인원을 입력해주세요" })
    .min(1, "1명 이상이어야 합니다"),
  content: z.string().min(20, "내용은 최소 20자 이상으로 작성해주세요."),
  location: z.string().nonempty("여행지를 선택해주세요"),
  mateGender: z.string().nonempty("메이트 성별을 선택해주세요"),
});

export type MateFormType = z.infer<typeof mateFormSchema>;
