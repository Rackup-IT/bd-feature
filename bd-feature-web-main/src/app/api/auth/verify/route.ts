import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { CustomError } from "@/utils/custom-error/custom_error";
import { connect } from "../../../../utils/database/database_helper";

export const POST = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token") as string;
  let client;
  let userEmail, userName;

  try {
    const decodedToken = jwt.verify(
      token as string,
      process.env.SCERATE_USER_KEY!
    );

    if (typeof decodedToken !== "string") {
      const { email, name } = decodedToken;
      userEmail = email;
      userName = name;
    }

    client = await connect();
    const db = client.db();

    const pendingUser = await db
      .collection("pending-users")
      .findOneAndDelete({ email: userEmail });

    if (pendingUser) {
      await db.collection("users").insertOne(pendingUser);
    } else {
      throw new CustomError(
        "আপনি একটি মুলতুবি ব্যবহারকারী নন",
        "You are not a pending user",
        403
      );
    }

    return NextResponse.json({
      gl: "You have successfully activated your account! Please try to Log In",
      bd: "আপনি সফলভাবে আপনার অ্যাকাউন্ট সক্রিয় করেছেন! লগ ইন করার চেষ্টা করুন",
    });
  } catch (error) {
    let errMsg = JSON.stringify({
      gl: "Something went wrnog!",
      bd: "কিছু ভুল হয়েছে!",
    });
    let code = 500;
    if (error instanceof CustomError) {
      errMsg = error.message;
      code = error.code!;
    }

    return NextResponse.json({ message: errMsg }, { status: code });
  } finally {
    client?.close();
  }
};
