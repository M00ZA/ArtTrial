import { AdminsComponent } from "@/app/(admin)/_components/admins/admins";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Admins',
}

const AdminsPage = () => {
  return (
    <div>
      <AdminsComponent />
    </div>
  );
}

export default AdminsPage;