import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import { connect } from "../../../../utils/database/database_helper";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = searchParams.get("token") as string;

  let client;
  let userId: string;

  try {
    client = await connect();
    const db = client.db();

    const decodedToken = jwt.verify(token, process.env.SCERATE_ADMIN_KEY!);

    if (typeof decodedToken !== "string") {
      const { id } = decodedToken;
      userId = id;
    }

    const currentAuthor = await db
      .collection("admins")
      .findOne({ _id: new ObjectId(userId!) });

    if (!currentAuthor) {
      throw new Error("Not found author by this id!");
    }

    return NextResponse.json(currentAuthor, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  } finally {
    await client?.close();
  }
}