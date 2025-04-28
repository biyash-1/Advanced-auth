
import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();

const TOKEN = "3b38da97619bf29e8b0b5df01a2ce0f2";

export const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 3649222,
});

export const sender = {
  email: "hello@example.com",
  name: "Mailtrap Test",
};
