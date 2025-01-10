import { NextRequest, NextResponse } from "next/server";

import { connect } from "../../../utils/database/database_helper";

export const GET = async (req: NextRequest) => {
  const query = req.nextUrl.searchParams;
  const searchText = query.get("searchText") || "";
  let client;
  try {
    client = await connect();
    const db = client.db();

    const indexes = await db.collection("posts").indexes();
    const hasTextIndex = indexes.some(
      (index) => index.name === "title_text_tags_text_article_text"
    );

    console.log(indexes);

    if (!hasTextIndex) {
      console.log("not has index");
      await db.collection("posts").createIndex({
        title: "text",
        tags: "text",
      });
    }

    const result = await db
      .collection("posts")
      .find({
        $text: { $search: searchText },
      })
      .sort({ updatedAt: -1 })
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  } finally {
    client?.close();
  }
};
