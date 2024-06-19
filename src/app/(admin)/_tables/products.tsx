import { Edit, Eye, Trash } from "lucide-react";

import GridActionsContainer, { createActionObject } from "@/lib/create-action";
import createColumn from "@/lib/create-column";

export const ProductsColumns = [
  createColumn(
    "title",
    "Title",
    (params: any) => params.row.title,
    true,
    true,
    true
  ),
  createColumn(
    "price",
    "Price",
    (params: any) => params.row.price,
    true,
    true,
    true
  ),
  createColumn("size", "Sizes", (params: any) => {
    return `${params.row.size}`;
  }),

  createColumn(
    "material",
    "Material",
    (params: any) => params.row.material,
    true,
    true,
    true
  ),
  createColumn("isAvailable", "Is Available", (params: any) => {
    return params.row.isAvailable ? (
      <span className="text-green-700 font-bold">Yes</span>
    ) : (
      <span className="text-orange-700 font-bold">No</span>
    );
  }),
  createColumn("category", "Category", (params: any) => {
    return <span>{params.row.category?.title}</span>;
  }),
  createColumn("owner", "Owner", (params: any) => {
    return (
      <span>
        {params.row?.owner ? params.row.owner?.name : "Not Available"}
      </span>
    );
  }),

  createColumn(
    "actions",
    "Actions",
    (params: any) => (
      <GridActionsContainer
        actions={[
          createActionObject(
            `/admin/products/${params.row.id}/edit`,
            "edit",
            Edit
          ),
          createActionObject(
            `/admin/products/${params.row.id}/delete`,
            "Delete",
            Trash
          ),
          createActionObject(
            `/admin/products/${params.row.id}/view`,
            "View",
            Eye
          ),
        ]}
      />
    ),
    false,
    false,
    false,
    1.5
  ),
];
