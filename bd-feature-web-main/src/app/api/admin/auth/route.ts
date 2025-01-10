import bcrypt from "bcryptjs";
// import { v2 as cloudinary } from "cloudinary";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

import { CustomError } from "@/utils/custom-error/custom_error";
import { connect } from "../../../../utils/database/database_helper";
import { generateSlug } from "../../../../utils/generate-slug/generate_slug";
import SendingMail from "../../../../utils/sending-mail/sending_mail";
import { logInSchema, schema } from "./validation/joi_schema";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_APIKEY,
//   api_secret: process.env.CLOUDNARY_APISCERATE,
// });

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const userEmail = searchParams.get("email");
  const userPassword = searchParams.get("password") as string;
  let client;
  try {
    const { error } = logInSchema.validate({
      email: userEmail,
      password: searchParams.get("password"),
    });

    if (error) {
      throw new CustomError("", error.message, 403);
    }

    client = await connect();
    const db = client.db();

    const findAdminUser = await db
      .collection("admins")
      .findOne({ email: userEmail });

    if (!findAdminUser) {
      throw new CustomError("", "This user is not an admin", 404);
    }

    const comparePassword = await bcrypt.compare(
      userPassword,
      findAdminUser.password
    );

    if (!comparePassword) {
      throw new CustomError("", "Password is incorrect", 403);
    }

    const token = jwt.sign(
      {
        email: findAdminUser.email,
        name: findAdminUser.name,
        id: findAdminUser._id,
      },
      process.env.SCERATE_ADMIN_KEY!,
      { expiresIn: "15d" }
    );
    return NextResponse.json({ adminToken: token }, { status: 200 });
  } catch (error) {
    // let errMsg: string = error as string;
    // let code: number = 500;
    // if (error instanceof CustomError) {
    //   errMsg = JSON.parse(error.message).en;
    //   code = error.code!;
    // }
    if (error instanceof CustomError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.code! }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    client?.close();
  }
};

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const formDataObj: { [key: string]: any } = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  let client;

  try {
    const { error } = schema.validate(formDataObj);
    if (error) {
      throw new CustomError("", error.message, 403);
    }

    if (formDataObj.password !== formDataObj["confirm-password"]) {
      throw new CustomError("", "passwords do not match", 403);
    }

    client = await connect();
    const db = client.db();

    // const generateProfilePicUrl = await cloudinary.uploader.upload(profilePic, {
    //   folder: "admins-profiles",
    //   unique_filename: true,
    // });

    const foundInPendingAdmins = await db
      .collection("pending-admins")
      .findOne({ email: formDataObj["email"] });

    if (foundInPendingAdmins) {
      throw new CustomError(
        "",
        "This email is already in pending admins list! Please with root admin to approve this email",
        403
      );
    }

    const isAlreadyAdmin = await db
      .collection("admins")
      .findOne({ email: formDataObj["email"] });

    if (isAlreadyAdmin) {
      throw new CustomError("", "You are already an admin, try to log in", 403);
    }

    formDataObj["password"] = await bcrypt.hash(formDataObj["password"], 12);

    await db.collection("pending-admins").insertOne({
      email: formDataObj["email"],
      name: formDataObj["name"],
      password: formDataObj["password"],
      profilePic: formDataObj["profile-pic"],
      work: formDataObj.work,
      bio: formDataObj.bio,
    });

    const token = jwt.sign(
      { email: formDataObj["email"], name: formDataObj["name"] },
      process.env.SCERATE_ADMIN_KEY!,
      { expiresIn: "24h" }
    );

    const confirmUrl = `${process.env.DOMAIN_URL}/admin/confirm-admin?token=${token}`;

    await SendingMail({
      from: process.env.GMAIL_USER!,
      to: "md-yeasinarafat@hotmail.com",
      subject: "Add As an Admin",
      html: `
         <p>Welcome to The BD-Feature , ${formDataObj["name"]}</p>
    <p style="margin-bottom: 15px;">This person ${formDataObj["name"]} want to became an admin</p>
    <br>
     <a
        style="
          margin-top: 15px;
          color: white;
          text-decoration: none;
          background-color: #f4530c;
          padding: 12px 22px;
          border-radius: 20px;
        "
        href="${confirmUrl}"
        >Confirm as Admin</a
      >
    <br>
    <br>
    <p style="margin-bottom: 15px;">
      If you know this person, please ignore this email.
    </p>
    <p style="color: #f4530c;">This link is valid for 1 hours.</p>
    <p>Glad to have your voice,</p>
    <h4>The BD-Feature</h4>
             `,
    });

    return NextResponse.json(
      "Sended mail to the root admin! Please wait until admin approved!. Once admin approved your request you will be notified by email",
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof CustomError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.code }
      );
    }
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    client?.close();
  }
};

export const PUT = async (req: NextRequest) => {
  const reqBody = await req.json();
  let userEmail, userName;
  let client;
  try {
    const decodeToken = jwt.verify(
      reqBody.token as string,
      process.env.SCERATE_ADMIN_KEY!
    );

    client = await connect();
    const db = client.db();

    if (typeof decodeToken !== "string") {
      const { email, name } = decodeToken;
      userEmail = email;
      userName = name;
    }

    const foundInPendingAdmins = await db
      .collection("pending-admins")
      .findOneAndDelete({ email: userEmail });

    const lastAdmin = await db
      .collection("admins")
      .find()
      .sort({ index: -1 })
      .limit(1)
      .toArray();

    const index = lastAdmin.length > 0 ? lastAdmin[0].index + 1 : 1;

    const newSlug = generateSlug(foundInPendingAdmins!.name, index);

    if (foundInPendingAdmins) {
      await db.collection("admins").insertOne({
        ...foundInPendingAdmins,
        articles: [],
        slug: newSlug,
        index: index,
      });
    }

    const confirmUrl = `${process.env.DOMAIN_URL}/admin/auth`;

    await SendingMail({
      from: process.env.GMAIL_USER!,
      to: userEmail,
      subject: "Add As an Admin",
      html: `
         <p>Great News ${userName}, Your request has been approved For The BD-Feature Admin Panel</p>
    <p style="margin-bottom: 15px;">You can now login as an admin in BD-Feature Admin Panel</p>
    <br>
     <a
        style="
          margin-top: 15px;
          color: white;
          text-decoration: none;
          background-color: #f4530c;
          padding: 12px 22px;
          border-radius: 20px;
        "
        href="${confirmUrl}"
        >Log In Now</a
      >
    <br>
    <br>
    <p style="margin-bottom: 15px;">
      Thank you for working with us.
    </p>
    <p>Glad to have your voice,</p>
    <h4>The BD-Feature</h4>
             `,
    });

    return NextResponse.json(
      `${userEmail} is approved as an admin! A mail has been sent to ${userEmail}`
    );
  } catch (error) {
    let errMsg: string = error as string;
    if (error instanceof JsonWebTokenError) {
      errMsg = "Not a valid authentication token";
    }
    if (error instanceof TokenExpiredError) {
      errMsg = "your authentication token is expired";
    }
    return NextResponse.json(errMsg);
  } finally {
    client?.close();
  }
};
