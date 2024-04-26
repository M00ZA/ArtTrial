import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const UsersColumns = [
  createColumn('id', 'ID'),
  createColumn('name', 'Name'),
  createColumn('name', 'Name'),
  createColumn('name', 'Name'),
  createColumn('name', 'Name'),
  createColumn('name', 'Name'),
 
  createColumn('actions', 'Actions', (params: any) => (
    <GridActionsContainer
      actions={[
        createActionObject(`/admin/users/${params.row.id}/edit`, 'edit', Edit),
        createActionObject(`/admin/users/${params.row.id}/delete`, 'Delete', Trash),
        createActionObject(`/admin/users/${params.row.id}/view`, 'View', Eye),
      ]}
    />
  ), false, false, false, 1.5),

];