import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";
import { formatDate } from "@/lib/utils";

export const EventsColumns = [
  createColumn('title', 'Title'),
  createColumn('began', 'Start', (params: any) => {
    return <span>{formatDate(params.row.began)}</span>
  }),

  createColumn('end', 'End', (params: any) => {
    return <span>{formatDate(params.row.end)}</span>
  }),

  createColumn('products', 'No. Of Products', (params: any) => {
    return <span>{params.row.products?.length} product(s)</span>
  }),
 
  createColumn('actions', 'Actions', (params: any) => (
    <GridActionsContainer
      actions={[
        createActionObject(`/admin/events/${params.row._id}/edit`, 'edit', Edit),
        createActionObject(`/admin/events/${params.row._id}/delete`, 'Delete', Trash),
        createActionObject(`/admin/events/${params.row._id}/view`, 'View', Eye),
      ]}
    />
  ), false, false, false, 1.5),
];