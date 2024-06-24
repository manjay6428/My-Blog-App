import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ICustomDeleteDialog {
  openBlogDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteBlogById?: (getCurrentID: any) => Promise<void>;
  getCurrentDeleteBlog?: any;
  handleDeleteMany?: (deleteSelectedItems: any) => Promise<void>;
  deleteSelectedItems?: string[];
  setDeleteSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  setMultipleDeleteSelected?: React.Dispatch<React.SetStateAction<boolean>>;
}
const CustomDeleteDialog: FC<ICustomDeleteDialog> = ({
  openBlogDialog,
  setOpenDialog,
  handleDeleteBlogById,
  getCurrentDeleteBlog,
  handleDeleteMany,
  deleteSelectedItems,
  setDeleteSelectedItems,
  setMultipleDeleteSelected,
}) => {
  return (
    <Dialog
      open={openBlogDialog}
      onOpenChange={() => {
        setOpenDialog(false);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {" "}
            {handleDeleteBlogById
              ? "Are you sure you want to delete this Blog ?"
              : "Are you sure you want to delete selected Blogs?"}
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            onClick={() => {
              setOpenDialog(false);
              setMultipleDeleteSelected && setMultipleDeleteSelected(false);
              setDeleteSelectedItems([])
            }}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() =>
              handleDeleteBlogById
                ? handleDeleteBlogById(getCurrentDeleteBlog)
                : handleDeleteMany && handleDeleteMany(deleteSelectedItems)
            }
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDeleteDialog;
