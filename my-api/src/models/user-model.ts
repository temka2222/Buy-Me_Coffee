import { model, Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  receivedDonations: {
    type: String,
    required: true,
  },
  Createdat: {
    type: Date,
    required: true,
  },
  bankCard: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
});
export const userModel = model("user", userSchema);
