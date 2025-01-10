import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { logInSchema, zodSchema } from "./validation/schema";

import { CustomError } from "@/utils/custom-error/custom_error";
import { Db } from "mongodb";
import { connect } from "../../../utils/database/database_helper";
import sendEmail from "../../../utils/sending-mail/sending_mail";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const userEmail = searchParams.get("email");
  const password = searchParams.get("password");
  let client;
  try {
    const validation = logInSchema.safeParse({
      email: userEmail,
      password: password,
    });

    if (validation.error) {
      const errMsg = JSON.parse(validation.error.errors[0].message);
      throw new CustomError(errMsg.bn, errMsg.en, 403);
    }

    client = await connect();
    const db: Db = client.db();

    const findUser = await db.collection("users").findOne({ email: userEmail });

    if (!findUser) {
      throw new CustomError(
        "এই ইমেল নিবন্ধিত নয়",
        "This email is not registered",
        404
      );
    }

    const comparePassword = await bcrypt.compare(password!, findUser.password);

    if (!comparePassword) {
      throw new CustomError("পাসওয়ার্ড ভুল", "Incorrect password", 403);
    }

    const token = jwt.sign(
      { email: findUser.email, name: findUser.name },
      process.env.SCERATE_USER_KEY!,
      {
        expiresIn: "30d",
      }
    );

    return NextResponse.json({ token: token }, { status: 200 });
  } catch (error) {
    let errMsg: string = JSON.stringify({
      gl: "Something went wrong!",
      bd: "কিছু ভুল হয়েছে!",
    });
    let code: number = 500;
    if (error instanceof CustomError) {
      errMsg = error.message;
      code = error.code!;
    }
    return NextResponse.json({ message: errMsg }, { status: code });
  } finally {
    await client?.close();
  }
};

export const POST = async (req: NextRequest) => {
  const fromData = await req.formData();
  const formObj: { [key: string]: any } = {};
  let client;

  fromData.forEach((value, key) => {
    formObj[key] = value;
  });

  try {
    const inputValidate = zodSchema.safeParse(formObj);
    if (inputValidate.error) {
      const errMsg = JSON.parse(inputValidate.error.errors[0].message);
      throw new CustomError(errMsg.bn, errMsg.en, 403);
    }

    client = await connect();
    const db = client.db();

    const foundUser = await db
      .collection("users")
      .findOne({ email: formObj.email });

    if (foundUser) {
      throw new CustomError(
        "আমরা খুঁজে পেয়েছি যে আপনার ইতিমধ্যেই এই ইমেলের সাথে একটি অ্যাকাউন্ট আছে৷",
        "We found you are already have an account with this email",
        403
      );
    }

    const foundInPendingUsers = await db
      .collection("pending-users")
      .findOne({ email: formObj.email });

    if (foundInPendingUsers) {
      throw new CustomError(
        "আমরা আপনাকে ইতিমধ্যে সাইন আপ করার জন্য অনুরোধ করা হয়েছে খুঁজে. আপনার ইমেল চেক করুন এবং এখন অ্যাকাউন্ট নিশ্চিত করুন",
        "We found you are already requested for sign up. please check you email and confirm account now",
        403
      );
    }

    formObj.password = await bcrypt.hash(formObj.password, 12);

    await db.collection("pending-users").insertOne(formObj);

    const token = jwt.sign(
      { email: formObj.email, name: formObj.name },
      process.env.SCERATE_USER_KEY!,
      {
        expiresIn: "1h",
      }
    );

    const confirmUrl = `${process.env.DOMAIN_URL}/${formObj.edition}/auth/confirm-user?token=${token}`;
    const mailOptions = {
      from: process.env.GMAIL_USER!,
      to: formObj.email,
      subject: "Activate your account",
      html: `
         <p>Welcome to The BD-Feature , ${formObj["name"]}</p>
    <p style="margin-bottom: 15px;">Please confirm you account by clicking on the button below</p>
    <br>
     <a
        style="
          margin-top: 15px;
          color: white;
          text-decoration: none;
          background-color: #f4530c;
          padding: 12px 22px;
          border-radius: 20px;
        "
        href="${confirmUrl}"
        >Confirm as Admin</a
      >
    <br>
    <br>
    <p style="margin-bottom: 15px;">
      By clicking on the button above, you agree to our <a href="#">Terms of Service</a>
    </p>
    <p style="color: #f4530c;">This link is valid for 1 hours.</p>
    <p>Glad to have your voice,</p>
    <h4>The BD-Feature</h4>
             `,
    };

    await sendEmail(mailOptions);

    return NextResponse.json({
      gl: "We send a mail to your e-mail address. please check it out.",
      bd: "আমরা আপনার ই-মেইল ঠিকানায় একটি মেইল ​​পাঠাই। এটা চেক আউট দয়া করে.",
    });
  } catch (error) {
    let errMsg: string = JSON.stringify({
      gl: "Something went wrong!",
      bd: "কিছু ভুল হয়েছে!",
    });
    let code: number = 500;
    if (error instanceof CustomError) {
      errMsg = error.message;
      code = error.code!;
    }
    return NextResponse.json({ message: errMsg }, { status: code });
  } finally {
    await client?.close();
  }
};
