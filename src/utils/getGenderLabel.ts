export function getGenderLabel(genderKey: string): string {
  switch (genderKey.toUpperCase()) {
    case "MALE":
      return "남성";
    case "FEMALE":
      return "여성";
    case "NO_PREFFERENCE":
      return "무관";
    default:
      return "무관";
  }
}
