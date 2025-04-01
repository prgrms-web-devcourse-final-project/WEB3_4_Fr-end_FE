"use client";

import { useState } from "react";

export default function PasswordChangeForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (password: string) => {
    const regex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?]).{8,}$"
    );
    return regex.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      setError("비밀번호가 틀립니다! (숫자+영어 대문자+소문자+특수문자)");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setError(""); // clear error
    alert("비밀번호 변경 완료");
  };

  const fields = [
    {
      label: "현재 비밀번호",
      placeholder: "현재 비밀번호를 입력해 주세요.",
      e: "비밀번호가 다릅니다.",
      value: currentPassword,
      onChange: (val: string) => setCurrentPassword(val),
      showError: false,
    },
    {
      label: "새로운 비밀번호",
      placeholder: "새로운 비밀번호를 입력해 주세요.",
      e: "비밀번호 형식이 올바르지 않습니다!",
      value: newPassword,
      onChange: (val: string) => setNewPassword(val),
      showError: newPassword.length > 0 && !validatePassword(newPassword),
    },
    {
      label: "새로운 비밀번호 확인",
      placeholder: "새로운 비밀번호를 한 번 더 입력해 주세요.",
      e: "입력한 새로운 비밀번호와 맞지 않습니다!",
      value: confirmPassword,
      onChange: (val: string) => setConfirmPassword(val),
      showError: confirmPassword.length > 0 && newPassword !== confirmPassword,
    },
  ];

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 border-black w-[726px] h-[698px] bg-white rounded-[8px]"
      >
        <div className="ml-[105px] mt-[50px]">
          <div className="flex">
            <span className="text-[40px]">🔒</span>
            <h2 className="text-[40px] font-bold">비밀번호 변경</h2>
          </div>
          <div className="flex-col ">
            <p className="text-[13px] text-black mb-2">
              회원님의 계정을 안전하게 보호하기 위해 정기적인 비밀번호 변경을
              권장합니다.
            </p>
            <p className="text-[13px] text-black mb-6">
              안전한 비밀번호 설정은 계정 보안을 강화하고, 해킹 및 부정
              접속으로부터 보호하는 데 중요한 역할을 합니다.
            </p>
          </div>
        </div>
        <div className="flex flex-col mb-[20px] items-center">
          {fields.map((f, i) => (
            <div key={i} className="flex flex-col items-start w-[408px] mb-4">
              <label>{f.label}</label>
              <input
                type="password"
                placeholder={f.placeholder}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                className="border p-2 rounded w-full h-[50px]"
              />
              <div
                className={`text-sm text-red-600 ${
                  f.showError ? "block" : "hidden"
                }`}
              >
                {f.e}
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-black text-white w-[196px] h-[39] py-2 mx-[265px] mt-[30px] mb-[169px] rounded-[8px] hover:opacity-90 "
        >
          수정 완료
        </button>
      </form>
      <button className="absolute top-6 right-6 text-sm text-customBlue-200 hover:underline">
        회원탈퇴
      </button>
    </div>
  );
}
