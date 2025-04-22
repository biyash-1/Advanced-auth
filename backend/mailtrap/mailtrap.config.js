// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv"
// dotenv.config();



// const TOKEN = "9c42a27d31afa9ff91daffca1cd636a8"
// console.log("token", TOKEN);


// export const client = new MailtrapClient({
//   token: TOKEN,
// });

// export const sender = {
//   email: "hello@demomailtrap.com",
//   name: "Mailtrap Test",
// };
// const recipients = [
//   {
//     email: "bsstha21@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);

import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
dotenv.config();
const TOKEN = "9c42a27d31afa9ff91daffca1cd636a8"

// Configuration exports
export const client = new MailtrapClient({
  token:TOKEN
});

export const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

// Remove the test send code from this file