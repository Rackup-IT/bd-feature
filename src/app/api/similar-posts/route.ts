import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

import { connect } from "../../../utils/database/database_helper";

export const POST = async (req: NextRequest) => {
  const reqBody = await req.json();
  const tagArray = reqBody.tags;
  const postId: string = reqBody.postId;
  let client;
  try {
    client = await connect();
    const db = client.db();

    const result = await db
      .collection("posts")
      .aggregate([
        {
          $match: {
            tags: { $in: tagArray },
            _id: { $ne: new ObjectId(postId) },
          },
        },
        {
          $addFields: {
            matchedTagsCount: {
              $size: {
                $filter: {
                  input: "$tags",
                  as: "tag",
                  cond: { $in: ["$$tag", tagArray] },
                },
              },
            },
          },
        },
        { $sort: { matchedTagsCount: -1 } },
        { $limit: 5 },
      ])
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  } finally {
    client?.close();
  }
};
