import { NextResponse } from "next/server";
import connectToDB from "../../../database";
import Blog from "../../../models/blog";

export async function GET() {
  try {
    await connectToDB();
    const getAllBlogs = await Blog.find({});

    if (getAllBlogs) {
      return NextResponse.json({
        success: true,
        data: getAllBlogs,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Something went wrong , try again!",
      });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      success: false,
      message: "Something went wrong , try again!",
    });
  }
}



