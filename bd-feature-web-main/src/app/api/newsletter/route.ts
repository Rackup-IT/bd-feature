import { CustomError } from "@/utils/custom-error/custom_error";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../utils/database/database_helper";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  let client;
  try {
    client = await connect();
    const db = client.db();

    const findAlreadyExitsOrNot = await db
      .collection("newsletter")
      .findOne({ email: reqBody.email });

    if (findAlreadyExitsOrNot) {
      throw new CustomError(
        "আপনি ইতিমধ্যে সদস্যতা করেছেন",
        "You have already subscribed",
        403
      );
    }

    await db.collection("newsletter").insertOne(reqBody);

    return NextResponse.json("You are subscribed successfully", {
      status: 201,
    });
  } catch (error) {
    let errMsg = JSON.stringify({
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
    client?.close();
  }
};
