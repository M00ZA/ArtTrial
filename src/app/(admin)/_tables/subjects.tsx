import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const SubjectsColumns = [
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
            `/admin/subjects/${params.row.id}/edit`,
            "edit",
            Edit
          ),
          createActionObject(
            `/admin/subjects/${params.row.id}/delete`,
            "Delete",
            Trash
          ),
          // createActionObject(
          //   `/admin/subjects/${params.row.id}/view`,
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
