import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const OrdersColumns = [
  createColumn("id", "ID", (params: any) => params.row.id, true, true, true),
  createColumn(
    "totalOrderPrice",
    "Total Price",
    (params: any) => params.row.totalOrderPrice,
    true,
    true,
    true
  ),
  createColumn("paymentMethodType", "Payment method", (params: any) => {
    return `${params.row.paymentMethodType}`;
  }),

  createColumn("isPaid", "Is Paid", (params: any) => {
    return params.row.isPaid ? (
      <span className="text-green-700 font-bold">Yes</span>
    ) : (
      <span className="text-orange-700 font-bold">No</span>
    );
  }),
  createColumn("isDelivered", "Is Delivered", (params: any) => {
    return params.row.isDelivered ? (
      <span className="text-green-700 font-bold">Yes</span>
    ) : (
      <span className="text-orange-700 font-bold">No</span>
    );
  }),
  createColumn("orderState", "State", (params: any) => {
    return <span>{params.row.orderState}</span>;
  }),
  createColumn("owner", "Owner", (params: any) => {
    return (
      <span>{params.row?.user ? params.row.user?.name : "Not Available"}</span>
    );
  }),

  createColumn(
    "actions",
    "Actions",
    (params: any) => (
      <GridActionsContainer
        actions={[
          createActionObject(
            `/admin/orders/${params.row.id}/edit`,
            "edit",
            Edit
          ),
          // createActionObject(
          //   `/admin/products/${params.row.id}/delete`,
          //   "Delete",
          //   Trash
          // ),
          // createActionObject(
          //   `/admin/products/${params.row.id}/view`,
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
