export function getGenderLabel(genderKey: string): string {
  switch (genderKey.toUpperCase()) {
    case "MALE":
      return "남성";
    case "FEMALE":
      return "여성";
    default:
      return "기타";
  }
}
