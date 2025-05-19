import { model, Schema } from "mongoose";

const donationSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  specialMessage: {
    type: String,
    required: true,
  },
  socialURLOrBuyMeACoffee: {
    type: String,
    required: true,
  },
  donorId: {
    type: String,
    required: true,
  },
  recipientId: {
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
export const donationdModel = model("donation", donationSchema);
