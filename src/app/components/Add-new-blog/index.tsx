import { Button } from "@/components/ui/button";
import React, { FC } from "react";
import CustomDialog from "../shared/CustomDialog";
interface IAddNewBlog {
  openBlogDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  blogFormData: {
    title: string;
    description: string;
  };
  setBlogFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
    }>
  >;
  handleSaveBlogData: () => Promise<void>;
}
const AddNewBlog: FC<IAddNewBlog> = ({
  openBlogDialog,
  setOpenDialog,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
}) => {
  return (
    <div className=" ml-6 mt-1">
      <Button onClick={() => setOpenDialog(true)}>Add New Blog</Button>
      <CustomDialog
        type="Add"
        openBlogDialog={openBlogDialog}
        setOpenDialog={setOpenDialog}
        loading={loading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
    </div>
  );
};

export default AddNewBlog;
