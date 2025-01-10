import JOI from "joi";

const schema = JOI.object({
  title: JOI.string().min(3).required().messages({
    "string.base": "Must be a text",
    "string.empty": "Cannot be an empty field",
    "any.required": "Title is a required field",
    "string.min": "Name must be at lest 3 characters long",
  }),
  thumbnail: JOI.any().required().messages({
    "any.required": "Must need to include the thumbnail image",
  }),
  thumbnailAltText: JOI.string().optional(),
  publisherId: JOI.string().required().messages({
    "string.base": "Must be a text",
    "string.empty": "Please enter a publisher name",
    "any.required": "Publisher name is a required field",
  }),
  publisherName: JOI.string().required().messages({
    "string.base": "Must be a text",
    "string.empty": "Please enter a publisher name",
    "any.required": "Publisher name is a required field",
  }),
  tags: JOI.string().min(3).required().messages({
    "string.base": "Must be a tag",
    "stirng.empty": "Please add minimum one tag",
    "string.min": "Please add minimum one tag",
    "any.required": "Tags is a required field",
  }),
  edition: JOI.string().required().messages({
    "string.base": "Must be a text",
    "string.required": "Edition is a required field",
    "string.empty": "Please select a edition",
  }),
  onNavigation: JOI.string().optional(),
  article: JOI.string().required().messages({
    "string.base": "Must be a text",
    "string.empty": "Please enter article",
    "string.required": "Article is a required field",
  }),
});

export default schema;
