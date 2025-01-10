import { CustomError } from "@/utils/custom-error/custom_error";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { Db } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "../../../../interfaces/user";
import { connect } from "../../../../utils/database/database_helper";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token") as string;

  let client;
  let userEmail;
  try {
    client = await connect();
    const db: Db = client.db();

    const decodedToken = jwt.verify(token, process.env.SCERATE_USER_KEY!);

    if (typeof decodedToken !== "string") {
      const { email } = decodedToken;
      userEmail = email;
    }

    const user = await db.collection("users").findOne({ email: userEmail });

    const clientUserModel: UserModel = {
      _id: user?._id.toString()!,
      email: user!.email,
      name: user!.name,
      "job-title": user!["job-title"],
    };

    return NextResponse.json(clientUserModel, { status: 200 });
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
    if (error instanceof JsonWebTokenError) {
      errMsg = JSON.stringify({
        gl: "The token is expired, Please relog in",
        bd: "টোকেনের মেয়াদ শেষ হয়ে গেছে, অনুগ্রহ করে পুনরায় লগ ইন করুন",
      });
    }
    if (error instanceof TokenExpiredError) {
      errMsg = JSON.stringify({
        gl: "The token is expired, Please relog in",
        bd: "টোকেনের মেয়াদ শেষ হয়ে গেছে, অনুগ্রহ করে পুনরায় লগ ইন করুন",
      });
    }
    return NextResponse.json({ message: errMsg }, { status: code });
  } finally {
    await client?.close();
  }
};
