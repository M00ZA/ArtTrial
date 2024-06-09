"use client";
import { usePathname, useRouter } from "next/navigation";
import OrdersComponent from "../../_components/ordersComponent/OrdersComponent";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "sonner";
import { getMyOrders } from "@/actions/users";
import { Order } from "@/types";
import LandingLoader from "../../_components/landingLoader/landingLoader";

export default function OrderPage() {
  const router = useRouter();
  //   const { id } = router.query;
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["orders", "me"],
      refetchType: "all",
    });

    toast.dismiss();
  }, [pathname]);

  const ordersQuery = useQuery({
    queryKey: ["orders", "me"],
    queryFn: () => getMyOrders(),
  });

  const { isLoading } = ordersQuery;
  const orders: Order[] = ordersQuery.data?.data?.data;

  if (isLoading) {
    return <LandingLoader />;
  }

  if (!orders) {
    return <div>orders not found!</div>;
  }

  return (
    <>
      {orders &&
        orders.map((order) => {
          const {
            id,
            isPaid,
            orderState,
            totalOrderPrice,
            paymentMethodType,
            currency,
          } = order;
          return (
            <OrdersComponent
              id={id}
              totalOrderPrice={totalOrderPrice}
              orderState={orderState}
              isPaid={isPaid}
              paymentMethodType={paymentMethodType}
              currency={currency}
              key={id}
            />
          );
        })}
    </>
  );
}
