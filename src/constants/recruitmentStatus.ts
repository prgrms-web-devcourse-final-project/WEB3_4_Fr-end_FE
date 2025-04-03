export const recruitmentStatuses = [
  { value: "OPEN", label: "모집 중" },
  { value: "CLOSED", label: "모집 종료" },
] as const;

export type RecruitmentStatus = (typeof recruitmentStatuses)[number]["value"];
export type RecruitmentStatusLabel =
  (typeof recruitmentStatuses)[number]["label"];
