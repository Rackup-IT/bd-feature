import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import { CustomError } from "../../../../utils/custom-error/custom_error";
import { connect } from "../../../../utils/database/database_helper";
import revalidateTag from "../../../[locale]/actions";
import { schema } from "./schema/validation_schema";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const edition = searchParams.get("edition");
  let client;
  try {
    client = await connect();
    const db = client.db();
    let result;

    if (edition) {
      result = await db
        .collection("navigation-items")
        .find({ edition: edition })
        .toArray();
    } else {
      result = await db.collection("navigation-items").find().toArray();
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    console.log("A new error now");
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    client?.close();
  }
};

export const POST = async (req: NextRequest) => {
  const authorization = req.headers.get("authorization") as string;
  const token = authorization.split(" ")[1];
  const reqBody = await req.json();
  let client;
  try {
    jwt.verify(token, process.env.SCERATE_ADMIN_KEY!);

    client = await connect();
    const db = client.db();
    const { error } = schema.validate(reqBody);
    if (error) {
      throw new CustomError("", error.message, 403);
    }

    const result = await db.collection("navigation-items").insertOne(reqBody);

    if (result.acknowledged === false) {
      throw new CustomError("", "Failed to insert data to database", 403);
    }

    await revalidateTag("navigations");
    return NextResponse.json({
      message: "request commed succesfully",
    });
  } catch (error) {
    let errMsg: string = "Something went wrong";
    let code: number = 500;
    if (error instanceof CustomError) {
      const parseError = JSON.parse(error.message);
      errMsg = parseError.en;
      code = error.code!;
    }
    if (error instanceof JsonWebTokenError) {
      errMsg = "your authentication token is invalid";
      code = 500;
    }
    if (error instanceof TokenExpiredError) {
      errMsg = "your authentication token is expired ! Please log in again";
      code = 500;
    }
    return NextResponse.json(
      { message: errMsg },
      {
        status: code!,
      }
    );
  } finally {
    client?.close();
  }
};

export const DELETE = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  let client;
  try {
    client = await connect();
    const db = client.db();
    await db
      .collection("navigation-items")
      .deleteOne({ _id: new ObjectId(id!) });
    return NextResponse.json("Deleted Successfully", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Not able to delete data right now ! please try again later !",
      },
      { status: 500 }
    );
  }
};
