import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { client, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  // Create a recipient object using the passed email
  const recipient = [{ email }];
  try {
    // Send the email with the verification token inserted in the template
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: "email verification"
    });

 
    return response;
  }
  catch (error) {
    console.log("error", error);
    throw new Error("error sending email");
  }
};


export const sendwelcomeEmail = async (email, name) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "87d23182-8560-452f-b66e-33b2487c9ab3",
      template_variables: {
        company_info_name: "Peak Voyage",
        name: name                        
      },
            
    });

    return response;  
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Error sending welcome email");
  }
};
