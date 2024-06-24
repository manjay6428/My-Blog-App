import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
interface ICustomButton {
  type?: string;
  openBlogDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
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
  handleSaveBlogData?: () => Promise<void>;
  handleUpdateBlog?: () => Promise<void>
}

const CustomDialog: FC<ICustomButton> = ({
  type,
  openBlogDialog,
  setOpenDialog,
  loading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData,
  handleUpdateBlog,
}) => {
  return (
    <Dialog
      open={openBlogDialog}
      onOpenChange={() => {
        setOpenDialog(false);
        setBlogFormData({
          title: "",
          description: "",
        });
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{type} Blog</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter Blog title"
              value={blogFormData?.title}
              onChange={(event) =>
                setBlogFormData({
                  ...blogFormData,
                  title: event.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              name="description"
              placeholder="Enter description"
              value={blogFormData?.description}
              onChange={(event) =>
                setBlogFormData({
                  ...blogFormData,
                  description: event.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={type==='Add'? handleSaveBlogData : handleUpdateBlog} type="button">
            {loading ? "Saving ..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
