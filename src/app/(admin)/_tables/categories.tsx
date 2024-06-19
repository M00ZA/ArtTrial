import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const CategoriesColumns = [
  createColumn(
    "title",
    "Title",
    (params: any) => params.row.title,
    true,
    true,
    true
  ),
  createColumn(
    "actions",
    "Actions",
    (params: any) => (
      <GridActionsContainer
        actions={[
          createActionObject(
            `/admin/categories/${params.row.id}/edit`,
            "edit",
            Edit
          ),
          createActionObject(
            `/admin/categories/${params.row.id}/delete`,
            "Delete",
            Trash
          ),
          // createActionObject(
          //   `/admin/categories/${params.row.id}/view`,
          //   "View",
          //   Eye
          // ),
        ]}
      />
    ),
    false,
    false,
    false,
    1.5
  ),
];
