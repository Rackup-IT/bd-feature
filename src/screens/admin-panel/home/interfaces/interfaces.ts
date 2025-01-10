import PostModel from "@/interfaces/post";

export interface Post {
  postId: string;
  title: string;
  thumbnail: string;
  highlight?: boolean;
}

export interface SectionData {
  title: string;
  piority: number;
  posts: Post[];
}

export interface SectionDataToView {
  title: string;
  piority: number;
  posts: PostModel[];
}

export interface PageType {
  _id?: string;
  edition: string;
  sections: SectionData[];
}
