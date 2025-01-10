interface PostModel {
  _id: string;
  title: string;
  thumbnail: string;
  thumbnailAltText: string;
  publisherName: string;
  publisherId: string;
  tags: string[];
  edition: string;
  article: string;
  onNavigation: string;
  highlight?: false;
  slug: string;
  index: number;
  createdAt: Date;
  updatedAt: Date;
}

export default PostModel;
