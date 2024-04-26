import { CategoriesComponent } from "@/app/(admin)/_components/categories/categories";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Categories',
}

const CategoriesPage = () => {
  return (
    <div>
      <CategoriesComponent />
    </div>
  );
}

export default CategoriesPage;