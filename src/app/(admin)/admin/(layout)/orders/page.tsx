import { OrdersComponent } from "@/app/(admin)/_components/orders/orderComponent";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};

const OrdersPage = () => {
  return (
    <div>
      <OrdersComponent />
    </div>
  );
};

export default OrdersPage;
