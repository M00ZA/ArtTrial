import { ProductsComponent } from "@/app/(admin)/_components/products/products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Products',
}

const ProductsPage = () => {
  return (
    <div>
      <ProductsComponent />
    </div>
  );
}
 
export default ProductsPage;