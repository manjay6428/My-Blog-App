import { NextResponse } from "next/server";
import connectToDB from "../../../database";
import Blog from "../../../models/blog";


export async function DELETE(req) {
    try{
        await connectToDB();
        const {searchParams} = new URL(req.url);
        const getCurrentBlogID = searchParams.get('id');
        if(!getCurrentBlogID){
            return NextResponse.json({
                success: false,
                message: "Blog id is required "
            })
        }
        const deleteCurrentBlog = await Blog.findByIdAndDelete(getCurrentBlogID);
        if(deleteCurrentBlog){
            return NextResponse.json({
                success: true,
                message: "Blog deleted successfully! "
            })
        }
        else{
            return NextResponse.json({
                success: false,
                message: "Something went wrong, Try again! "
            })
        }
    }catch(err){
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Something went wrong, Try again! "
        })
    }
}