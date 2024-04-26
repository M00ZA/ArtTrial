import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const UsersColumns = [
  createColumn('userName', 'Name', (params: any) => params.row.name, true, true, true),
  createColumn('email', 'E-mail', (params: any) => params.row.email, true, true, true),
  createColumn('phoneNumber', 'Phone', (params: any) => params.row.phone, false, false, false),
  createColumn('accountActive', 'Is Active?', (params: any) => {
    return <span className={params.row.accountActive ? 'text-green-700 font-bold' : 'text-orange-500'}>{params.row.accountActive ? 'Yes' : 'No'}</span>
  }, true, true, true),
  createColumn('actions', 'Actions', (params: any) => (
    <GridActionsContainer
      actions={[
        createActionObject(`/admin/users/${params.row._id}/edit`, 'edit', Edit),
        createActionObject(`/admin/users/${params.row._id}/delete`, 'Delete', Trash),
        createActionObject(`/admin/users/${params.row._id}/view`, 'View', Eye),
      ]}
    />
  ), false, false, false, 1.5),
];