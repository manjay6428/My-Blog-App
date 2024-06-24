import { NextResponse } from "next/server";
import connectToDB from "../../../database";
import Blog from "../../../models/blog";


export async function DELETE(req) {
    
    try{
        await connectToDB();
        const deleteDataArray = await req.json();
        if(!deleteDataArray){
            return NextResponse.json({
                success: false,
                message: "Please select at least one item to delete. "
            })
        }
        const deleteCurrentBlog = await Blog.deleteMany({ _id: { $in: deleteDataArray } })
        if(deleteCurrentBlog){
            return NextResponse.json({
                success: true,
                message: "Blogs deleted successfully! "
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
            message: "Something went wrong, Try again! err "
        })
    }
}