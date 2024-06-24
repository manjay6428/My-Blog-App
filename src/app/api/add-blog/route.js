import { error } from "console";
import { NextResponse } from "next/server";
import connectToDB from "../../../database";
import Joi from "joi";
import mongoose, { mongo } from "mongoose";
import Blog from "../../../models/blog";

const AddNewBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function POST(req) {
  try {
    await connectToDB();
    const BlogData = await req.json();
    const { title, description } = BlogData;
    const { error } = AddNewBlog.validate({
      title,
      description,
    });
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
    const NewlyAddedBlog = await Blog.create(BlogData);
    if (NewlyAddedBlog) {
      return NextResponse.json({
        success: true,
        message: "New Blog added succcessfully!",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong  try again!",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong  try again!",
    });
  }
}



