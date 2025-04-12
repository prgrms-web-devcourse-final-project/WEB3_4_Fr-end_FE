export function timeStamp(input: Date | string): string {
  // Date 객체로 변환
  const date = typeof input === "string" ? new Date(input) : input;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 60) {
    return `${diffMinutes}분전`;
  }

  const diffHours = Math.floor(diffMs / 3600000);
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }

  const diffDays = Math.floor(diffMs / 86400000);
  return `${diffDays}일 전`;
}
