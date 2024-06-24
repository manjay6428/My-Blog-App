import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import CustomDialog from "./CustomDialog";
import Blog from "@/models/blog";
import { useRouter } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import CustomDeleteDialog from "./CustomDeleteDialog";
import { RectangleVertical } from "lucide-react";
interface ICustomCard {
  blogList: any;
  isMultipleDeleteSelected?: boolean;
  setMultipleDeleteSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteSelectedItems: string[];
  setDeleteSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}
const CustomCard: FC<ICustomCard> = ({
  blogList,
  isMultipleDeleteSelected,
  deleteSelectedItems,
  setDeleteSelectedItems,
}) => {
  const initialFormData = {
    title: "",
    description: "",
  };
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  const [openBlogDialog, setOpenDialog] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);
  const [openDeleteConfirmationDialog, setDeleteConfirmationDialog] =
    useState(false);
  const { toast } = useToast();
  const [getCurrentDeleteBlog, setCurrentDeleteBlog] = useState("");

  const handleDeleteBlogById = async (getCurrentID:any) => {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentID}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) router.refresh();
      toast({
        title: "Blog deleted Successfully!",
      });
      setDeleteConfirmationDialog(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdateBlog = async () => {
    try {
      const apiResponse = await fetch(
        `/api/update-blog?id=${currentEditedBlogID}`,
        {
          method: "PUT",
          body: JSON.stringify(blogFormData),
        }
      );

      const result = await apiResponse.json();
      console.log(result);

      if (result?.success) {
        setBlogFormData(initialFormData);
        setOpenDialog(false);
        router.refresh();
        console.log("result", result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleEdit = (getCurrentBlog:any) => {
    setCurrentEditedBlogID(getCurrentBlog?._id);
    setOpenDialog(true);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
  };
  const handleCheckBoxChange = (id: any, isChecked: boolean) => {
    isChecked
      ? setDeleteSelectedItems((prevItems) => [...prevItems, id])
      : setDeleteSelectedItems((prevItems) =>
          prevItems.filter((itemId) => itemId !== id)
        );
  };
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
      {blogList && blogList.length > 0 ? (
        blogList.map((blogitem:any) => (
          <Card className={`p-5 mb-3 ${isMultipleDeleteSelected && 'bg-slate-200'}`} id={blogitem.id} >
            <CardContent>
              <div className=" flex justify-between items-center">
                <CardTitle className=" mb-2">{blogitem?.title}</CardTitle>
                {isMultipleDeleteSelected && (
                  <input
                    type="checkbox"
                    checked={deleteSelectedItems.includes(blogitem?._id)}
                    onChange={(e) =>
                      handleCheckBoxChange(blogitem?._id, e.target.checked)
                    }
                  />
                )}
              </div>
              <CardDescription>{blogitem?.description}</CardDescription>
              <div className=" flex justify-start items-center gap-4 mt-5">
                <Button onClick={() => handleEdit(blogitem)}>Edit</Button>
                <Button
                  onClick={() => {
                    setDeleteConfirmationDialog(true);
                    setCurrentDeleteBlog(blogitem._id);
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <h1 className=" text-4xl font-bold mx-auto">
          No blogs Found . Add one
        </h1>
      )}
      <CustomDialog
        type="Update"
        openBlogDialog={openBlogDialog}
        setOpenDialog={setOpenDialog}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleUpdateBlog={handleUpdateBlog}
      />
      <CustomDeleteDialog
        openBlogDialog={openDeleteConfirmationDialog}
        setOpenDialog={setDeleteConfirmationDialog}
        handleDeleteBlogById={handleDeleteBlogById}
        getCurrentDeleteBlog={getCurrentDeleteBlog}
        setDeleteSelectedItems={setDeleteSelectedItems}
      />
    </div>
  );
};

export default CustomCard;
