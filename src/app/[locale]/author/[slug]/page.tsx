import { ObjectId } from "mongodb";
import { Metadata } from "next";
import { connect } from "../../../../utils/database/database_helper";

import AuthorScreen from "../../../../screens/author-screen/author_screen";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const author = await getAuthor(params.slug);
  return {
    title: `${author.name} From BD-Feature`,
    description: author.bio,
  };
}

const getAuthor = async (slug: string) => {
  const client = await connect();
  const db = client.db();
  const author = await db.collection("admins").findOne({ slug: slug });
  await client.close();

  return JSON.parse(JSON.stringify(author));
};

const findAuthorPosts = async (id: ObjectId) => {
  const client = await connect();
  const db = client.db();
  const posts = await db
    .collection("posts")
    .find({ publisherId: id })
    .toArray();
  await client.close();
  return JSON.parse(JSON.stringify(posts));
};

const AuthorPage = async ({ params }: { params: { slug: string } }) => {
  const author = await getAuthor(params.slug);
  const articles = await findAuthorPosts(author._id);
  return <AuthorScreen author={author} posts={articles} />;
};

export default AuthorPage;
