import { AddAdminComponent } from "@/app/(admin)/_components/admins/add-admin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Admin',
}

const AddAdminPage = () => {
  return (
    <div>
      <AddAdminComponent />
    </div>
  );
}
 
export default AddAdminPage;