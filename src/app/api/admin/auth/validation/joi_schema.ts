import JOI from "joi";

export const schema = JOI.object({
  "profile-pic": JOI.string().required().messages({
    "string.base": "Profile pic url must be a added",
    "string.empty": "Please upload a profile pic",
    "any.required": "Profile pic is a required field",
  }),
  email: JOI.string().email().required().messages({
    "string.base": "Email must be a text",
    "string.empty": "Please enter an email",
    "string.email": "Please enter a valid email",
    "any.required": "Email is a required field",
  }),
  name: JOI.string().min(3).required().messages({
    "string.base": "Name must be a text",
    "string.empty": "Please enter a name",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is a required field",
  }),
  password: JOI.string().min(8).required().messages({
    "stirng.base": "Password must be a text",
    "string.empty": "Please enter a password",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is a required field",
  }),
  work: JOI.string().min(3).required().messages({
    "string.base": "Work must be a text",
    "string.empty": "Please a your work profession",
    "string.min": "Work must be at least 3 characters long",
    "any.required": "Work is a required field",
  }),
  bio: JOI.string().required().messages({
    "string.base": "Bio data must be a text type",
    "string.empty": "Please enter a bio",
    "any.required": "Bio is a required field",
  }),
  "confirm-password": JOI.string().min(8).required().messages({
    "string.base": "Confirm password must be a text",
    "string.empty": "Please enter a confirm password",
    "string.min": "Confirm password must be at least 8 characters long",
    "any.required": "Confirm password is a required field",
  }),
});

export const logInSchema = JOI.object({
  email: JOI.string().email().required().messages({
    "string.base": "Email must be a text",
    "string.empty": "Please enter an email",
    "string.email": "Please enter a valid email",
    "any.required": "Email is a required field",
  }),
  password: JOI.string().min(8).required().messages({
    "stirng.base": "Password must be a text",
    "string.empty": "Please enter a password",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is a required field",
  }),
});
