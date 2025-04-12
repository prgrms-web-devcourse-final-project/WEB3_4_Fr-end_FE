import apiClient from "@/config/axiosConfig";

export const uploadImageToServer = async (
  file: File
): Promise<{ imageId: number; getUrl: string }> => {
  const presignRes = await apiClient.post(
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
