import { MailtrapClient } from "mailtrap";
import { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE} from "./emailTemplates.js";
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


export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace('{resetURL}', resetURL)
    });
    return response;
  } catch (err) {
    console.error("Error sending password reset email:", err);
    throw new Error("Failed to send password reset email");
  }
};


export const sendResetSuccessEmail = async (email) => {
	const recipient = [{ email }];

	try {
		const response = await client.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_REQUEST_TEMPLATE,
			category: "Password Reset",
		});

		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};