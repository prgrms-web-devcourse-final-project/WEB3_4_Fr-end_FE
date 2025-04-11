"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import api from "@/lib/auth/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/useAuthStore";

interface UserInfo {
  nickname: string;
  email: string;
  phone: string;
  bio: string;
  profileImage: string | null;
  mailingType: boolean;
}

export default function ProfileChangeForm() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { setUser } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/api/v1/user/me");
        const data: UserInfo = res.data;
        setNickname(data.nickname);
        setIntro(
          data.bio || "자연을 사랑하는 여행자와 함께할 메이트를 찾습니다! 🌿✈️"
        );
        setEmail(data.email);
        setPhone(data.phone);
        if (!data.profileImage || data.profileImage === "null") {
          setProfileImage(null);
        } else {
          setProfileImage(data.profileImage);
        }

        setIsSubscribed(data.mailingType);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error(
            error.response?.data.message || "❌ 유저 정보 불러오기 실패:"
          );
          toast.error("유저 정보 불러오기에 실패했습니다!");
        }
      }
    };

    fetchUser();
  }, []);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^01[016789]\d{7,8}$/.test(phone);
  const nicknameValid = /^[a-zA-Z0-9가-힣]{2,10}$/.test(nickname.trim());

  const patchJson = async (url: string, data: Record<string, unknown>) => {
    return await api.patch(url, data, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const uploadImageToServer = async (
    file: File
  ): Promise<{ imageId: number; getUrl: string }> => {
    const presignRes = await api.post(
      "/api/v1/image",
      {},
      {
        headers: {
          "Content-Type": file.type,
        },
      }
    );

    const {
      presigned: { postUrl, formData },
      imageId,
      getUrl,
    } = presignRes.data;

    const uploadForm = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      uploadForm.append(key, value as string);
    });

    uploadForm.append("file", file);

    const uploadRes = await fetch(postUrl, {
      method: "POST",
      body: uploadForm,
    });
    if (!uploadRes.ok) {
      throw new Error("S3 업로드 실패");
    }
    return { imageId, getUrl };
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setProfileImage(imageUrl);
    console.log("파일 MIME 타입:", file.type);

    try {
      const { imageId, getUrl } = await uploadImageToServer(file);
      await api.patch("/api/v1/user/me/profile-image", {
        imageId,
        imageUrl: getUrl,
      });
      toast.success("프로필 이미지가 변경되었습니다!");
      const res = await api.get("/api/v1/user/me");
      setUser(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data.message || "프로필 이미지 변경 실패"
        );
        toast.error("프로필 이미지 변경에 실패했습니다!");
      }
    }
  };

  const handleRemoveImage = async () => {
    try {
      await api.patch("/api/v1/user/me/profile-image", {
        profileImageUrl: null,
      });
      setProfileImage(null);
      toast.success("이미지가 제거되었습니다.");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          error.response?.data.message || "프로필 이미지 제거 실패"
        );
        toast.error("이미지 제거에 실패했습니다.");
      }
    }
  };
  const updateNickname = async () => {
    const safeNickname = nickname.trim();
    if (!nicknameValid) {
      toast.error("닉네임은 2~10자의 한글, 영문, 숫자만 입력해주세요.");
      return;
    }

    try {
      console.log("📡 PATCH /api/v1/user/me/nickname 요청:", {
        nickname: safeNickname,
      });

      const response = await patchJson("/api/v1/user/me/nickname", {
        nickname: safeNickname,
      });

      console.log("✅ 닉네임 응답 성공:", response.data);
      toast.success("닉네임이 변경되었습니다.");
      setEditingField(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message || "❌ 닉네임 변경 실패");
        toast.error("닉네임 변경에 실패했습니다!");
      }
    }
  };

  const updateBio = async () => {
    try {
      await patchJson("/api/v1/user/me/bio", { bio: intro });
      toast.success("자기소개가 변경되었습니다.");
      setEditingField(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message || "❌ 자기소개 변경 실패");
        toast.error("자기소개 변경에 실패했습니다!");
      }
    }
  };

  const fields = [
    {
      label: "이메일",
      type: "email",
      placeholder: "새로운 이메일을 입력해 주세요.",
      e: "이메일 형식이 올바르지 않습니다!",
      value: email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value),
      isValid: !email || emailValid,
      onSubmit: async () => {
        if (!email.trim()) {
          toast.error("이메일을 입력해주세요.");
          return;
        }
        if (!emailValid) {
          toast.error("이메일 형식이 올바르지 않습니다.");
          return;
        }
        try {
          await patchJson("/api/v1/user/me/email", { email });
          toast.success("이메일이 변경되었습니다.");
          setEditingField(null);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(
              error.response?.data.message || "❌ 이메일 변경 실패"
            );
            toast.error("이메일 변경에 실패했습니다!");
          }
        }
      },
    },
    {
      label: "휴대폰 번호",
      type: "text",
      placeholder: "새로운 휴대폰 번호를 입력해 주세요. (-제외)",
      e: "휴대폰 번호 형식이 올바르지 않습니다!",
      value: phone,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPhone(e.target.value),
      isValid: !phone || phoneValid,
      onSubmit: async () => {
        if (!phone.trim()) {
          toast.error("휴대폰 번호를 입력해주세요.");
          return;
        }
        if (!phoneValid) {
          toast.error("휴대폰 번호 형식이 올바르지 않습니다.");
          return;
        }
        try {
          await patchJson("/api/v1/user/me/phone", { phone });
          toast.success("휴대폰 번호가 변경되었습니다.");
          setEditingField(null);
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            console.error(
              error.response?.data.message || "❌ 휴대폰 번호 변경 실패"
            );
            toast.error("휴대폰 번호 변경에 실패했습니다!");
          }
        }
      },
    },
  ];

  const toggleSubscribed = async () => {
    try {
      const nextState = !isSubscribed;

      await api.patch("/api/v1/user/me/mailing-type", {
        mailingType: nextState,
      });

      setIsSubscribed(nextState);

      toast.success(
        nextState
          ? "메일링 구독을 신청하였습니다!"
          : "메일링 구독을 취소하였습니다!"
      );
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data.message || "❌ 메일링 변경 실패");
        toast.error("메일 수신 설정 변경에 실패했습니다!");
      }
    }
  };

  return (
    <div className="w-[726px] h-[698px] relative bg-white rounded-lg mb-[168px]">
      <div className="flex gap-8">
        <div className="flex flex-col items-center mt-[95px] ml-[95px]">
          <div className="w-[150px] h-[150px] relative rounded-full overflow-hidden">
            <Image
              src={profileImage || "/defaultAvatar/31.png"}
              alt="프로필 이미지"
              width={150}
              height={150}
              className="object-cover"
            />
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            type="button"
            onClick={handleUploadClick}
            className="mt-4 w-[120px] h-[25px] bg-customViloet-200 rounded-lg text-white text-[13px] hover:bg-customBlue-200 cursor-pointer"
          >
            이미지 업로드
          </button>
          <button
            onClick={handleRemoveImage}
            className="mt-2 text-customViloet-200 text-[13px] hover:text-customBlue-200 cursor-pointer"
          >
            이미지 제거
          </button>
        </div>
        <div className="flex flex-col w-full relative">
          <div className="absolute left-[0] top-[75px] w-[1px] h-[219px] bg-customGray-400" />
          <div className="ml-8 mt-[101px]">
            {editingField === "nickname" ? (
              <div>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="text-[40px] font-bold rounded w-full max-w-[447px] h-[60px]"
                />
                <div className="flex justify-end w-[408px]">
                  <button
                    onClick={updateNickname}
                    className="text-customViloet-200 text-[16px] font-bold hover:text-customBlue-200 cursor-pointer mb-[20px]"
                  >
                    확인
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[40px] font-bold max-w-[447px] h-[60px]">
                  {nickname}
                </p>
                <div className="flex justify-end w-[408px]">
                  <button
                    className="text-customViloet-200 text-[16px] font-bold hover:text-customBlue-200 cursor-pointer mb-[20px]"
                    onClick={() => setEditingField("nickname")}
                  >
                    수정
                  </button>
                </div>
              </>
            )}

            {editingField === "bio" ? (
              <>
                <br />
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  className="mt-2 text-[13px] font-semibold w-[408px] h-[60px]"
                />
                <br />
                <div className="flex justify-end w-[408px]">
                  <button
                    onClick={updateBio}
                    className="text-customViloet-200 text-[16px] font-bold hover:text-customBlue-200 cursor-pointer mb-[45px]"
                  >
                    확인
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="mt-2 text-[13px] font-semibold w-[326px] h-[60px] mb-[6.5px]">
                  {intro}
                </p>
                <div className="flex justify-end w-[408px]">
                  <button
                    className="text-customViloet-200 text-[16px] font-bold hover:text-customBlue-200 cursor-pointer mb-[45px]"
                    onClick={() => setEditingField("bio")}
                  >
                    수정
                  </button>
                </div>
              </>
            )}

            {fields.map((f, i) => (
              <div key={i} className="w-[408px]">
                <label className="text-base text-black font-[pretendard]">
                  {f.label}
                </label>
                {editingField === f.label ? (
                  <>
                    <input
                      type={f.type}
                      onChange={f.onChange}
                      placeholder={f.placeholder}
                      className="w-full h-[50px] px-2.5 py-2 bg-white rounded outline outline-customGray-300 mt-1 focus:outline-customGray-600"
                    />
                    <p
                      className={`text-customPink-300 text-[13px] mt-1 ${
                        f.isValid ? "hidden" : ""
                      }`}
                    >
                      {f.e}
                    </p>
                    <div className="flex justify-end mt-[15px]">
                      <button
                        className="text-customViloet-200 text-[16px] font-bold hover:text-customBlue-200 cursor-pointer"
                        onClick={f.onSubmit}
                      >
                        확인
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col">
                    <input
                      type={f.type}
                      value={f.value}
                      onChange={f.onChange}
                      placeholder={f.placeholder}
                      className="w-full h-[50px] px-2.5 py-2 bg-white rounded outline outline-customGray-300 mt-1 focus:outline-customGray-600"
                    />
                    <p
                      className={`text-customPink-300 text-[13px] mt-1 ${
                        f.isValid ? "hidden" : ""
                      }`}
                    >
                      {f.e}
                    </p>
                    <div className="flex justify-end mt-[15px]">
                      <button
                        className="text-customViloet-200 text-[16px] font-bold hover:text-customBlue-200 cursor-pointer"
                        onClick={() => setEditingField(f.label)}
                      >
                        수정
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isSubscribed ? (
              <div className="mt-14 w-[408px] h-[115px] border border-customGray-300 rounded">
                <div className="mt-[20px] ml-[20px] mb-[6px]">
                  <p className="text-[13px] font-semibold">
                    아쉽지만, 이제 작별할 시간인가요? 언제든 다시 돌아오실 수
                    있어요! 🥲
                  </p>
                  <p className="text-[13px] font-semibold">
                    구독 취소는 아래에서 가능합니다.
                  </p>
                </div>
                <button
                  onClick={toggleSubscribed}
                  className="bg-black text-white text-[13px] font-bold rounded-[8px] w-[93px] h-[30px] mt-[6px] ml-[272px] mb-[27px] hover:bg-customBlue-200 cursor-pointer"
                >
                  구독 취소
                </button>
              </div>
            ) : (
              <div className="mt-8 w-[408px] border border-customGray-300 rounded-[4px]">
                <div className="mt-[10px]">
                  <p className="text-[16px] font-semibold ml-[10px]">
                    🎉 이제부터 우리와 함께해요!
                  </p>
                  <p className="text-[13px] font-semibold mb-[7px] ml-[25px]">
                    앞으로 Planit의 유용한 정보와 소식을 메일로 받아보실 수
                    있어요.😎😎 좋은 인연이 되길 바라요! 😊
                  </p>
                </div>
                <button
                  onClick={toggleSubscribed}
                  className="bg-black text-white text-[13px] font-bold rounded-[8px] w-[93px] h-[30px] mt-[6px] ml-[272px] mb-[17px] hover:bg-customBlue-200"
                >
                  구독하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
