"use client";
import { Box, Stack, Typography } from "@mui/material";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import OrderItem from "../orderComponent/OrderItem";
import LandingLoader from "../landingLoader/landingLoader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { Address } from "@/types";
import { getProfileAdresses } from "@/actions/users";
import Link from "next/link";

export default function AddressComponent() {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["addresses"] });
  }, [pathname]);

  const addressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: () => getProfileAdresses(),
  });
  const { isLoading, data, isError } = addressesQuery;

  const addresses: Address[] = data?.data?.data;
  console.log(addresses);

  if (isLoading) {
    return <LandingLoader />;
  }

  return (
    <>
      <SectionWrapper txt="Addresses" noBottomBorder>
        {isError && <div>Something went wrong please try again later</div>}
        {addresses &&
          addresses.length > 0 &&
          addresses.map((address) => {
            const {
              alias,
              city,
              country,
              phone,
              postalCode,
              region,
              street,
              id: shippingId,
            } = address;
            return (
              <Box
                // direction="column"
                component="div"
                sx={{
                  backgroundColor: "#eeeaea",
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
                    backgroundColor: "#eeeaea",
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
            );
          })}
      </SectionWrapper>
      <Link
        href={"/profile/address/add"}
        style={{ maxWidth: "200px", margin: "0 auto" }}
      >
        <Typography
          component="p"
          sx={{
            "&:hover": {
              backgroundColor: "rgb(108 99 255 / 90%)",
            },
            background: "rgb(108 99 255)",
            color: "white",
            padding: "8px 14px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          Add address
        </Typography>
      </Link>
    </>
  );
}
