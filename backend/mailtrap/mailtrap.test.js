import { client, sender } from "./mailtrap.config.js";

const recipients = {
  email: "sthaalish39@gmail.com", // VALID EMAIL
  name: "Alish User" // Optional
};

client.send({
  from: sender,
  to: recipients,
  subject: "You are awesome!",
  text: "Congrats for sending test email with Mailtrap!",
  category: "Integration Test",
})
.then(console.log)
.catch(console.error);