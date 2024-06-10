"use client";
import { getOrder } from "@/actions/users";
import { Order, OrderById } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import LandingLoader from "../landingLoader/landingLoader";
import { Box, Stack, Typography } from "@mui/material";
import OrderItem from "./OrderItem";
import CartItem from "../cartComponent/CartItem";

export default function OrderComponet() {
  const { id } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  console.log("myid", id);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["products", id],
      refetchType: "all",
    });
    queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
    toast.dismiss();
  }, [pathname]);

  const orderQuery = useQuery({
    queryKey: ["events", id],
    queryFn: () => getOrder(id as string),
  });

  const order: OrderById = orderQuery.data?.data?.data;

  const { isLoading } = orderQuery;

  if (isLoading) {
    return <LandingLoader />;
  }

  if (!order) {
    return <div>There is not such order!</div>;
  }
  const {
    cartItems,
    currency,
    deliveredAt,
    id: orderId,
    isDelivered,
    isPaid,
    orderState,
    paidAt,
    paymentMethodType,
    totalOrderPrice,
    user,
    shippingAddress,
  } = order;

  const {
    alias,
    city,
    country,
    phone,
    postalCode,
    region,
    street,
    id: shippingId,
  } = shippingAddress;
  return (
    <Box
      component="div"
      width={{ xs: "initial", lg: "1200px" }}
      margin="0 auto"
      sx={{
        backgroundColor: "#f8f8f8",
        minheight: "100vh",
        padding: "20px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="column"
        sx={{
          padding: { xs: "0", md: "20px" },
          gap: "20px",
          maxWidth: "800px",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            // padding: "20px",
            gap: "20px",
          }}
        >
          <Box
            // direction="column"
            component="div"
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "20px",
              minWidth: "380px",
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              marginBottom={".4rem"}
              // fontWeight={"bold"}
              // fontSize={"1.2rem"}
              // color="#7469B6"
              textAlign="center"
            >
              Order Information
            </Typography>
            <Stack
              direction="column"
              sx={{
                backgroundColor: "white",
                //   padding: "20px",
                gap: "8px",
              }}
            >
              <OrderItem prop="Order ID" value={orderId} />
              <OrderItem prop="Total Order Price" value={totalOrderPrice} />
              <OrderItem prop="Payment type" value={paymentMethodType} />
              <OrderItem prop="Order State" value={orderState} />
            </Stack>
          </Box>
          <Box
            // direction="column"
            component="div"
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "20px",
              minWidth: "380px",
            }}
          >
            <Typography
              component="h2"
              variant="h6"
              marginBottom={".4rem"}
              // fontWeight={"bold"}
              // fontSize={"1.2rem"}
              // color="#7469B6"
              textAlign="center"
            >
              Deliverey Information
            </Typography>
            <Stack
              direction="column"
              sx={{
                backgroundColor: "white",
                //   padding: "20px",
                gap: "8px",
              }}
            >
              <OrderItem prop="Address Type" value={alias} />
              <OrderItem prop="Street" value={street} />
              <OrderItem prop="region" value={region} />
              <OrderItem prop="Country" value={country} />
              <OrderItem prop="Phone" value={phone} />
            </Stack>
          </Box>
        </Stack>
        {/* <Stack
          direction={{ xs: "column", md: "row" }}
          sx={
            {
              //   padding: "20px",
            }
          }
        ></Stack> */}
        <Stack direction="column" sx={{}}>
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item) => {
              const { price, product } = item;
              const { coverImage, owner, title, id } = product;
              return (
                <>
                  <Typography
                    component="h2"
                    variant="h6"
                    marginBottom={".4rem"}
                    // fontWeight={"bold"}
                    // fontSize={"1.2rem"}
                    // color="#7469B6"
                    textAlign="center"
                  >
                    Cart Items
                  </Typography>
                  <CartItem
                    imgUrl={coverImage?.image}
                    name={owner.name}
                    price={price + ""}
                    title={title}
                    id={id}
                    key={id}
                    noAction={true}
                  />
                </>
              );
            })}
        </Stack>
      </Stack>
    </Box>
  );
}
