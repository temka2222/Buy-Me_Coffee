import { model, Schema } from "mongoose";

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  avatarImage: {
    type: String,
    required: true,
  },
  socialMediaURL: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    required: true,
  },
  Createdat: {
    type: Date,
    required: true,
  },

  updatedAt: {
    type: Date,
    required: true,
  },
});
export const profileModel = model("profile", profileSchema);
