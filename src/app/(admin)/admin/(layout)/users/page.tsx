import { UsersComponent } from "@/app/(admin)/_components/users/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Users',
}

const UsersPage = () => {
  return (
    <div>
      <UsersComponent />
    </div>
  );
}
 
export default UsersPage;