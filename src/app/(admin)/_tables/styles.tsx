import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const StylesColumns = [
  createColumn("title", "Title"),
  createColumn(
    "actions",
    "Actions",
    (params: any) => (
      <GridActionsContainer
        actions={[
          createActionObject(
            `/admin/styles/${params.row.id}/edit`,
            "edit",
            Edit
          ),
          createActionObject(
            `/admin/styles/${params.row.id}/delete`,
            "Delete",
            Trash
          ),
          // createActionObject(
          //   `/admin/styles/${params.row.id}/view`,
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
