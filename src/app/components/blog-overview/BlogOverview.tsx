"use client";
import React, { FC, useEffect, useState } from "react";
import CustomDialog from "../shared/CustomDialog";
import AddNewBlog from "../Add-new-blog";
import CustomCard from "../shared/CustomCard";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CustomDeleteDialog from "../shared/CustomDeleteDialog";
import { FaXmark } from "react-icons/fa6";
import { RiDeleteBin6Fill } from "react-icons/ri";
interface IBlogOverview {
  blogList: any;
}
const BlogOverview: FC<IBlogOverview> = ({ blogList }) => {
  const initialFormData = {
    title: "",
    description: "",
  };
  const [openBlogDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  const [isMultipleDeleteSelected, setMultipleDeleteSelected] = useState(false);
  const [deleteSelectedItems,setDeleteSelectedItems]=useState<string[]>([]);
  const[multiDeleteDialog, setMultiDeleteDialog]=useState(false);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  const handleSaveBlogData = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch("/api/add-blog", {
        method: "POST",
        body: JSON.stringify(blogFormData),
      });
      const result = await apiResponse.json();
      setLoading(false);
      if (result?.success) {
        router.refresh();
        setBlogFormData(initialFormData);
        setOpenDialog(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setBlogFormData(initialFormData);
    }
  };
  const handleDeleteMany= async (deleteSelectedItems:any)=> {
    try {
      const apiResponse = await fetch(`/api/delete-many-blogs`, {
        method: "DELETE",
        body: JSON.stringify(deleteSelectedItems)
      });
      console.log("apiResponse",apiResponse);
      
      const result = await apiResponse.json();

      if (result?.success) {
        router.refresh();
        setMultipleDeleteSelected(false);
        setMultiDeleteDialog(false);
      }
      // setDeleteConfirmationDialog(false);

    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className=" min-h-screen flex flex-col gap-10 bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <div className=" w-full h-14 flex items-center gap-4">
        <Link href={"/"}>
          <Button className=" mt-1">Home</Button>
        </Link>
        <AddNewBlog
          openBlogDialog={openBlogDialog}
          setOpenDialog={setOpenDialog}
          loading={loading}
          blogFormData={blogFormData}
          setBlogFormData={setBlogFormData}
          handleSaveBlogData={handleSaveBlogData}
        />
        <Button className=" mt-1" onClick={()=> setMultipleDeleteSelected(true)}>Delete Multiple</Button>
      </div>
      <div className=" flex ">
      <h1 className=" text-3xl font-bold mx-auto text-white">
        Blog list section
      </h1>
      {isMultipleDeleteSelected && <div className=" flex gap-3 items-center">
        <RiDeleteBin6Fill size={28} onClick={()=> setMultiDeleteDialog(true)}/>
        <FaXmark size={28} onClick={()=>{
          setMultipleDeleteSelected(false)
          setDeleteSelectedItems([])
        }}/>
        </div>}
      </div>
      <CustomCard
        blogList={blogList}
        isMultipleDeleteSelected={isMultipleDeleteSelected}
        setMultipleDeleteSelected={setMultipleDeleteSelected}
        deleteSelectedItems={deleteSelectedItems}
        setDeleteSelectedItems={setDeleteSelectedItems}
      />
      <CustomDeleteDialog
        openBlogDialog={multiDeleteDialog}
        setOpenDialog={setMultiDeleteDialog}
        handleDeleteMany={handleDeleteMany}
        deleteSelectedItems={deleteSelectedItems}
        setDeleteSelectedItems={setDeleteSelectedItems}
        setMultipleDeleteSelected={setMultipleDeleteSelected}
      />
    </div>
  );
};

export default BlogOverview;
