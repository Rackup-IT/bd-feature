import { z } from "zod";

export const zodSchema = z.object({
  email: z
    .string({
      message: JSON.stringify({
        en: "Email must be a text",
        bn: "ইমেইল একটি টেক্স্ট নেই",
      }),
    })
    .email({
      message: JSON.stringify({
        en: "Email must be a valid email",
        bn: "ইমেইল সঠিক নয়",
      }),
    })
    .min(1, {
      message: JSON.stringify({
        en: "Email is a required field",
        bn: "ইমেইল অবশ্যই পূরণ করতে হবে",
      }),
    }),
  password: z
    .string({
      message: JSON.stringify({
        en: "Password must be a text",
        bn: "পাসওয়ার্ড একটি পাঠ্য হতে হবে",
      }),
    })
    .min(8, {
      message: JSON.stringify({
        en: "Password must be at least 8 characters long",
        bn: "পাসওয়ার্ড কমপক্ষে 8 অক্ষরের হতে হবে",
      }),
    })
    .min(1, {
      message: JSON.stringify({
        en: "Password is a required field",
        bn: "পাসওয়ার্ড অবশ্যই পূরণ করতে হবে",
      }),
    }),
  name: z
    .string({
      message: JSON.stringify({
        en: "নাম একটি পাঠ্য হতে হবে",
        bn: "নাম একটি পাঠ্য হতে হবে",
      }),
    })
    .min(1, {
      message: JSON.stringify({
        en: "Name field must need to be filled",
        bn: "নাম অবশ্যই পূরণ করতে হবে",
      }),
    })
    .min(3, {
      message: JSON.stringify({
        en: "Name must be at least 3 characters long",
        bn: "নাম কমপক্ষে 3 অক্ষরের হতে হবে",
      }),
    }),
  "job-title": z
    .string({
      message: JSON.stringify({
        en: "বিভাগের নাম একটি পাঠ্য হতে হবে",
        bn: "বিভাগের নাম একটি পাঠ্য হতে হবে",
      }),
    })
    .optional(),
  "terms-condition": z
    .string({
      message: JSON.stringify({
        en: "You must accept terms and conditions",
        bn: "আপনি নিশ্চিত করতে হবেন না নি",
      }),
    })
    .min(1, {
      message: JSON.stringify({
        en: "You must accept terms and conditions",
        bn: "আপনাকে অবশ্যই শর্তাবলী মেনে নিতে হবে",
      }),
    }),
  edition: z.string().optional(),
});

export const logInSchema = z.object({
  email: z
    .string({
      message: JSON.stringify({
        en: "Email must be a text",
        bn: "ইমেইল একটি টেক্স্ট নেই",
      }),
    })
    .email({
      message: JSON.stringify({
        en: "Email must be a valid email",
        bn: "ইমেইল সঠিক নয়",
      }),
    })
    .min(1, {
      message: JSON.stringify({
        en: "Email is a required field",
        bn: "ইমেইল অবশ্যই পূরণ করতে হবে",
      }),
    }),
  password: z
    .string({
      message: JSON.stringify({
        en: "Password must be a text",
        bn: "পাসওয়ার্ড একটি পাঠ্য হতে হবে",
      }),
    })
    .min(8, {
      message: JSON.stringify({
        en: "Password must be at least 8 characters long",
        bn: "পাসওয়ার্ড কমপক্ষে 8 অক্ষরের হতে হবে",
      }),
    })
    .min(1, {
      message: JSON.stringify({
        en: "Password is a required field",
        bn: "পাসওয়ার্ড অবশ্যই পূরণ করতে হবে",
      }),
    }),
});
