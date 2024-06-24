import React, { useEffect } from 'react'
import BlogOverview from '../components/blog-overview/BlogOverview'
const fetchAllBlogs = async ()=> {
  try{
    const apiresponse = await fetch('http://localhost:3000//api/get-blog', {
      method: "GET", 
      cache: "no-store"
    })
    const result = await apiresponse.json();
    return result?.data
  }catch(error){
    console.log(error);
    
  }
}
const page = async () => {
  const blogList = await fetchAllBlogs();
  console.log("blogList", blogList);
  return (
    <div>
      <BlogOverview blogList={blogList}/>
    </div>
  )
}

export default page
