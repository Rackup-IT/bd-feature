import nodemailer from "nodemailer";
import { CustomError } from "../../utils/custom-error/custom_error";

export default async function sendingMail(mailOptions: {
  [key: string]: string;
}) {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw new CustomError(
      "",
      "Failed to send email, Please try again later",
      500
    );
  }
}
