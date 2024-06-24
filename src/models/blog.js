import mongoose from "mongoose";

const BlogSchema = mongoose.Schema({
    title: String,
    description : String
})

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;