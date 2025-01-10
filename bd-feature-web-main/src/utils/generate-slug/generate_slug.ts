import slugify from "slugify";

export const generateSlug = (slug: string, index: number) => {
  return `${slugify(slug, { lower: true })}-${index}`;
};
