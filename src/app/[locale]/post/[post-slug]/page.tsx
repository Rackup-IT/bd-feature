import { ObjectId } from "mongodb";
import { Metadata } from "next";
import ProductDetailScreen from "../../../../screens/product-detail-screen/product_detail_screen";

import { connect } from "../../../../utils/database/database_helper";

// export async function generateStaticParams() {
//   const client = await connect();
//   const db = client.db();
//   const res = await db.collection("posts").find().toArray();
//   await client.close();

//   return res.map((post) => ({
//     "post-slug": post.slug,
//   }));
// }

export async function generateMetadata({
  params,
}: {
  params: { "post-slug": string };
}): Promise<Metadata> {
  const post = await getSinglePost(params["post-slug"]);
  return {
    title: post.title,
    description: post.article,
    openGraph: {
      type: "article",
      // url: process.env.DOMAIN_URL + `/gl/post/${post.slug}`,
      title: post.title,
      description: post.article,
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.thumbnailAltText,
        },
      ],
    },
  };
}

const getSinglePost = async (slug: string) => {
  const res = await fetch(process.env.DOMAIN_URL + `/api/admin/post/${slug}`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Not found post this name");
  }

  return res.json();
};

const getAuthor = async (id: string) => {
  const client = await connect();
  const db = client.db();
  const authorResult = await db
    .collection("admins")
    .findOne({ _id: new ObjectId(id) });
  await client.close();
  const author = JSON.parse(JSON.stringify(authorResult));

  return author;
};

const DetailPage = async ({ params }: { params: { "post-slug": string } }) => {
  const post = await getSinglePost(params["post-slug"]);
  const author = await getAuthor(post.publisherId);
  return <ProductDetailScreen post={post} author={author} />;
};

export default DetailPage;
