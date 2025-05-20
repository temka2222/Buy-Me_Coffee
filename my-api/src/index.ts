import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { authRouter } from "../src/routes/auth.route";
import { profileRouter } from "./routes/profile.route";
config();
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
// app.use("/bank-card", bankCardRouter);
// app.use("/donation", donationRouter);
app.get("/", (req, res) => {
  res.json("connected");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
