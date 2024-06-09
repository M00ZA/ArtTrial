import { Box, Divider, Stack, Typography } from "@mui/material";
import { Order } from "@/types";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Link from "next/link";

export default function OrdersComponent({
  isPaid,
  id,
  orderState,
  totalOrderPrice,
  paymentMethodType,
  currency,
}: Partial<Order>) {
  return (
    <Stack
      direction="column"
      flex={1}
      sx={{
        backgroundColor: "#F6F6F6",
        gap: "20px",
        padding: "20px",
      }}
    >
      <Box component="div" width="400px" margin="0 auto">
        <Link href={`/order/${id}`}>
          <Stack
            direction="column"
            // flex={1}
            sx={{
              width: "400px",
              background: "white",
              margin: "0 auto",
              borderRadius: "12px",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                justifySelf: "flex-end",
                //   marginTop: "auto",
                padding: "20px 0",
                //   background: "white",
                //   maxWidth: "800px",
                //   margin: "0 auto",
                // borderTop: "1px solid gray",
              }}
            >
              <Typography
                component="p"
                variant="body2"
                // marginBottom={".4rem"}
                // fontWeight={"bold"}
                // fontSize={"1.2rem"}
                color="#7469B6"
              >
                {`Order ID: ${id}`}
              </Typography>
              <LocalShippingIcon />
            </Stack>
            <Divider
              variant="middle"
              component="li"
              sx={{ listStyle: "none" }}
            />
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                justifySelf: "flex-end",
                padding: "20px 0",
              }}
            >
              <Typography
                component="p"
                variant="body2"
                // marginBottom={".4rem"}
                // fontWeight={"bold"}
                // fontSize={"1.2rem"}
                color="#7469B6"
              >
                {paymentMethodType}
              </Typography>
              <Typography
                component="p"
                variant="body2"
                // marginBottom={".4rem"}
                // fontWeight={"bold"}
                // fontSize={"1.2rem"}
                color="#7469B6"
              >
                {orderState}
              </Typography>
            </Stack>
            <Divider
              variant="middle"
              component="li"
              sx={{ listStyle: "none" }}
            />
            <Stack
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                justifySelf: "flex-end",
                padding: "20px 0",
              }}
            >
              <Typography component="p" variant="body2" color="#7469B6">
                Total Price
              </Typography>
              <Typography component="p" variant="body2" color="#7469B6">
                {`${totalOrderPrice} ${currency}`}
              </Typography>
            </Stack>
            {!isPaid && (
              <>
                <Divider
                  variant="middle"
                  component="li"
                  sx={{ listStyle: "none" }}
                />
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 0",
                  }}
                >
                  <Typography
                    component="p"
                    variant="body2"
                    color="gray"
                    textAlign="center"
                  >
                    You haven't paid this order
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
        </Link>
      </Box>
    </Stack>
  );
}
