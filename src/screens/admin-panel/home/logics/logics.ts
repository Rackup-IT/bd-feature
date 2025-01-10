import { Dispatch, SetStateAction } from "react";

import { PageType, Post, SectionData } from "../interfaces/interfaces";

export const onAddSectionClick = (
  setSectionData: Dispatch<SetStateAction<PageType>>,
  sectionData: PageType
) => {
  const newSection: SectionData = {
    title: "",
    posts: [],
    piority: sectionData.sections.length,
  };

  setSectionData((prev) => {
    const updatedData = { ...prev };
    updatedData.sections.push(newSection);
    return updatedData;
  });
};

export const onTitleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSectionData: Dispatch<SetStateAction<PageType>>,
  index: number
) => {
  setSectionData((prev) => {
    const updatedData = { ...prev };
    updatedData.sections[index].title = e.target.value;
    return updatedData;
  });
};

export const onPiorityChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setSectionData: Dispatch<SetStateAction<PageType>>,
  index: number
) => {
  setSectionData((prev) => {
    const updatedData = { ...prev };
    updatedData.sections[index].piority = Number(e.target.value);
    return updatedData;
  });
};

export const onRemoveSectionClick = (
  setSectionData: Dispatch<SetStateAction<PageType>>,
  sectionData: PageType,
  index: number
) => {
  setSectionData((prev) => {
    const updatedData = { ...prev };
    const newUpdatedList = updatedData.sections.filter(
      (p) => p.piority !== sectionData.sections[index].piority
    );
    updatedData.sections = newUpdatedList;
    return updatedData;
  });
};

// export const onAddPostClick = (
//   setSectionData: Dispatch<SetStateAction<PageType>>,
//   index: number
// ) => {
//   setSectionData((prev) => {
//     const updatedData = { ...prev };
//     updatedData.sections[index].posts.push({
//       postId: Math.random().toString(),
//       highlight: false,
//     });
//     return updatedData;
//   });
// };

// export const onAddNewPost = (
//   setSectionData: Dispatch<SetStateAction<PageType>>,
//   sectionIndex: number,
//   post: PostModel
// ) => {
//   setSectionData((prev) => {
//     const updatedData = { ...prev };
//     updatedData.sections[sectionIndex].posts = [
//       ...updatedData.sections[sectionIndex].posts,
//       {
//         postId: post._id,
//         highlight: false,
//       },
//     ];
//     return updatedData;
//   });
// };

export const onAddNewPostList = (
  setSectionData: Dispatch<SetStateAction<PageType>>,
  posts: Post[],
  sectionIndex: number
) => {
  setSectionData((prev) => {
    const updatedData = { ...prev };
    updatedData.sections[sectionIndex].posts = [
      ...updatedData.sections[sectionIndex].posts,
      ...posts,
    ];
    return updatedData;
  });
};

export const onRemovePostClick = (
  setSectionData: Dispatch<SetStateAction<PageType>>,
  sectionIndex: number,
  post: Post
) => {
  setSectionData((prev) => {
    const updatedData = { ...prev };
    const newUpdatedList = updatedData.sections[sectionIndex].posts.filter(
      (pst) => pst.postId !== post.postId
    );
    updatedData.sections[sectionIndex].posts = newUpdatedList;
    return updatedData;
  });
};

export const onHighlightPostClick = (
  setSectionData: Dispatch<SetStateAction<PageType>>,
  sectionIndex: number,
  postIndex: number
) => {
  setSectionData((prev) => {
    const updatedData = { ...prev };
    const highlighted =
      updatedData.sections[sectionIndex].posts[postIndex].highlight;
    if (highlighted) {
      updatedData.sections[sectionIndex].posts[postIndex].highlight = false;
    } else {
      updatedData.sections[sectionIndex].posts[postIndex].highlight = true;
    }
    return updatedData;
  });
};
