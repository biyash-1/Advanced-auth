
// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";
// dotenv.config();

// const TOKEN = "3b38da97619bf29e8b0b5df01a2ce0f2";

// export const client = new MailtrapClient({
//   token: TOKEN,
//   testInboxId: 3649222,
// });

// export const sender = {
//   email: "hello@example.com",
//   name: "Mailtrap Test",
// };


import { MailtrapClient } from "mailtrap"

const TOKEN = "c43132fdd90793850b2f963c4af4f2aa";

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};
