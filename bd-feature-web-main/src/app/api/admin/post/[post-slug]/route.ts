import { NextRequest, NextResponse } from "next/server";
import { connect } from "../../../../../utils/database/database_helper";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ "post-slug": string }> }
) => {
  const postSlug = (await params)["post-slug"];
  let client;
  try {
    client = await connect();
    const db = client.db();

    const postIndex = parseInt(postSlug.split("-").pop() as string, 10);

    const titleSlug = postSlug.replace(`-${postIndex}`, "");

    const result = await db
      .collection("posts")
      .findOne({ slug: `${titleSlug}-${postIndex}` });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  } finally {
    client?.close();
  }
};
