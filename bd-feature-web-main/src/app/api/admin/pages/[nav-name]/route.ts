import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "../../../../../utils/database/database_helper";
import action from "../../../../[locale]/actions";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ "nav-name": string }> }
) => {
  const searchParams = req.nextUrl.searchParams;
  const edition = searchParams.get("edition");
  const navName = (await params)["nav-name"];
  let client;
  try {
    client = await connect();
    const db = client.db();

    const result = await db.collection(navName).findOne({ edition: edition });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "a new error here" }, { status: 500 });
  } finally {
    client?.close();
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ "nav-name": string }> }
) => {
  const authorization = req.headers.get("authorization") as string;
  const authToken = authorization.split(" ")[1];
  const navName = (await params)["nav-name"];
  const reqBody = await req.json();

  let result;
  let client;

  try {
    jwt.verify(authToken, process.env.SCERATE_ADMIN_KEY!);

    client = await connect();
    const db = client.db();

    const findResult = await db
      .collection(navName)
      .findOne({ edition: reqBody.edition });

    if (findResult) {
      result = await db
        .collection(navName)
        .findOneAndReplace(
          { _id: findResult._id },
          { edition: findResult.edition, sections: reqBody.sections }
        );
    } else {
      result = await db.collection(navName).insertOne(reqBody);
    }

    await action("sections");
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    let errMsg: string = "Something went wrong";
    if (error instanceof JsonWebTokenError) {
      errMsg = "You authentication token is not valid";
    }
    if (error instanceof TokenExpiredError) {
      errMsg = "You authentication token is expired! Try to log in again";
    }
    return NextResponse.json({ message: errMsg! }, { status: 500 });
  } finally {
    client?.close();
  }
};
