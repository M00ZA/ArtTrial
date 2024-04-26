import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const CategoriesColumns = [
  createColumn('title', 'Title'),
  createColumn('actions', 'Actions', (params: any) => (
    <GridActionsContainer
      actions={[
        createActionObject(`/admin/categories/${params.row._id}/edit`, 'edit', Edit),
        createActionObject(`/admin/categories/${params.row._id}/delete`, 'Delete', Trash),
        createActionObject(`/admin/categories/${params.row._id}/view`, 'View', Eye),
      ]}
    />
  ), false, false, false, 1.5),
];