export interface SocialSignupFormData {
  email: string;
  nickname: string;
  phone: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  gender: string;
}

export interface EmailSignupFormData extends SocialSignupFormData {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface SignupFormData {
  birthYear: string;
  birthMonth: string;
  birthDay: string;
}
