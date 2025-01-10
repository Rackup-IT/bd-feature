import { NextRequest, NextResponse } from "next/server";

import { ObjectId } from "mongodb";
import {
  Post,
  SectionData,
} from "../../../screens/admin-panel/home/interfaces/interfaces";
import { connect } from "../../../utils/database/database_helper";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  let client;

  try {
    client = await connect();
    const db = client.db();

    const getPageData = await db
      .collection(reqBody.navId)
      .findOne({ edition: reqBody.edition });

    const sections: SectionData[] = getPageData!.sections;

    const postIds = sections.flatMap((section) =>
      section.posts.map((post) => new ObjectId(post.postId))
    );

    const postCursor = await db
      .collection("posts")
      .find({ _id: { $in: postIds } })
      .toArray();

    sections.forEach((section) => {
      section.posts = section.posts.map((post) => {
        const postObj = postCursor.find((p) => p._id.equals(post.postId));
        return postObj ? { ...postObj, highlight: post.highlight } : post;
      }) as Post[];
    });

    sections.sort((a, b) => a.piority - b.piority);

    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    client?.close();
  }
};
