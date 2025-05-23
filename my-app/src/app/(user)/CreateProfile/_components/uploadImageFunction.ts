import axios from "axios";

export const UPLOUD_PRESSET = "temuulen";
export const CLOUD_NAME = "dpmo1etqt";
export const uploadImage = async (file: File | undefined) => {
  if (!file) return;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOUD_PRESSET);
  try {
    const responseImg = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/formData",
        },
      }
    );
    return responseImg.data.url;
  } catch (error) {
    console.log(error);
  }
};
