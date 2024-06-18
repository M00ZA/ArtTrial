import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const AdminsColumns = [
  createColumn(
    "name",
    "Name",
    (params: any) => params.row.name,
    true,
    true,
    true
  ),
  createColumn("userName", "Username"),
  createColumn(
    "gender",
    "Gender",
    (params: any) => params.row.gender,
    true,
    true,
    true
  ),
  createColumn(
    "role",
    "Role",
    (params: any) => params.row.role,
    true,
    true,
    true
  ),
  createColumn(
    "phone",
    "Phone",
    (params: any) => params.row.phone,
    false,
    false,
    false
  ),
  createColumn(
    "actions",
    "Actions",
    (params: any) => (
      <GridActionsContainer
        actions={[
          createActionObject(
            `/admin/admins/${params.row.id}/edit`,
            "edit",
            Edit
          ),
          createActionObject(
            `/admin/admins/${params.row.id}/delete`,
            "Delete",
            Trash
          ),
          // createActionObject(
          //   `/admin/admins/${params.row.id}/view`,
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
