"use client";

import { Eye } from "lucide-react";
import { PageTitle } from "../page-title";

export const ViewAdminComponent = () => {
  return (
    <div>
      <PageTitle 
        icon={Eye}
        label='View User'
      />
    </div>
  );
}
 