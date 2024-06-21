"use client";
import "../carousel/embla.css";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

import LandingLoader from "../landingLoader/landingLoader";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { deleteAuction, getAuctionDetails } from "@/actions/users";
import { toast } from "sonner";
import { Auction, Cart, Product } from "@/types";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import PropertyTagItem from "../artwork/PropertTagItem";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

export default function ArtistAuctionDetails() {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  console.log("myid", id);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["auction", "product", id],
      refetchType: "all",
    });

    toast.dismiss();
  }, [pathname]);

  const auctionQuery = useQueries({
    queries: [
      {
        queryKey: ["auction", "product", id],
        queryFn: () => getAuctionDetails(id as string),
      },
    ],
  });

  const deleteMutation = useMutation({
    mutationFn: (values: { id: string }) => deleteAuction(values.id),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Auction has been deleted successfully!");
        router.push(`/auction?type=artist`);
        return;
      }
      toast.error("Couldn't delete!");
      console.log(d);
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const { isLoading } = auctionQuery[0];

  const auction: Auction = auctionQuery[0].data?.data?.data;

  const OPTIONS: EmblaOptionsType = {};

  if (isLoading) {
    return <LandingLoader />;
  }

  if (!auction) {
    return <div>auction not found!</div>;
  }

  function deleteHandler() {
    deleteMutation.mutate({ id: id as string });
  }

  const price =
    auction?.lastPrices[auction?.lastPrices.length - 1]?.price ||
    auction?.price;

  return (
    <Box
      component="div"
      sx={{
        margin: "20px",
        backgroundColor: "#f8f8f8",
        // height: "500px",
        color: "#5f5f5f",
        // display: "flex",
        // justifyContent: "space-between",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ justifyContent: "space-evenly" }}
      >
        <Stack direction={{ xs: "column" }} sx={{ flex: 1, padding: "2rem" }}>
          {/* #c9ab81 */}
          <Stack
            direction={{ xs: "column" }}
            sx={{ maxWidth: "400px", margin: "0 auto" }}
          >
            <Typography
              component="h3"
              variant="body1"
              marginBottom={".4rem"}
              // fontWeight={"bold"}
              fontSize={"1.2rem"}
              color="#c9ab81"
            >
              {auction?.title}
            </Typography>
            <Typography
              component="p"
              variant="body1"
              marginBottom={".4rem"}
              // fontWeight={"bold"}
              fontSize={".9rem"}
              color="#5f5f5f"
              maxWidth="400px"
              position="relative"
            >
              {auction?.description}
              <Typography
                component="p"
                variant="body2"
                position="absolute"
                // marginBottom={".4rem"}
                // fontWeight={"bold"}
                // fontSize={".9rem"}
                // color="#5f5f5f"
                // maxWidth="400px"
                sx={{
                  bottom: "32px",
                  right: "0",
                  backgroundColor: "#EDEDED",
                  borderRadius: "12px",
                  textAlign: "center",
                  // width: "80px",
                  color: "#6C63FF",
                  display: "block",
                  padding: "2px 12px",
                  marginLeft: "auto",
                }}
              >
                {auction?.category}
              </Typography>
              <Typography
                component="p"
                variant="body1"
                marginBottom={".4rem"}
                // fontWeight={"bold"}
                fontSize={".9rem"}
                color="#5f5f5f"
                maxWidth="400px"
                sx={{
                  backgroundColor: "#6C63FF",
                  borderRadius: "90px 0 90px 0",
                  textAlign: "center",
                  width: "80px",
                  color: "white",
                  marginLeft: "auto",
                }}
              >
                {auction?.price}
              </Typography>
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              marginBottom="12px"
            >
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography
                component="span"
                variant="body2"
                fontSize={"1rem"}
                color="#6C63FF"
              >
                {auction?.artist?.name}
              </Typography>
            </Stack>
            <Typography
              component="h3"
              variant="body1"
              marginBottom={".4rem"}
              // fontWeight={"bold"}
              fontSize={"1rem"}
              //   color="#c9ab81"
              display="flex"
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              Starting Bid
              <Typography
                component="span"
                variant="body2"
                fontSize={"1rem"}
                color="#6C63FF"
                display="flex"
                alignItems={"center"}
                gap={"4px"}
              >
                <MonetizationOnIcon />
                {price}
              </Typography>
            </Typography>
            <Typography
              component="p"
              variant="body1"
              marginBottom={"0"}
              // fontWeight={"bold"}
              fontSize={".9rem"}
              color="#5f5f5f"
              maxWidth="400px"
            >
              This auction has a buyer’s premium.
            </Typography>
            <Typography
              component="p"
              variant="body1"
              marginBottom={".4rem"}
              // fontWeight={"bold"}
              fontSize={".9rem"}
              color="#5f5f5f"
              maxWidth="400px"
            >
              shipping, Taxes, and additional fees may apply
            </Typography>

            <Typography
              component="h3"
              variant="body1"
              //   marginBottom={".4rem"}
              margin="1rem"
              // fontWeight={"bold"}
              //   fontSize={"1.2rem"}
              color="black"
              textAlign={"center"}
            >
              Auction Information
            </Typography>

            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <PropertyTagItem
                property="Began"
                value={new Date(auction?.began).toLocaleDateString()}
              />
              <PropertyTagItem
                property="End"
                value={new Date(auction?.end).toLocaleDateString()}
              />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <PropertyTagItem property="Category" value={auction?.category} />
              <PropertyTagItem property="Material" value={auction?.material} />
            </Stack>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <PropertyTagItem property="Style" value={auction?.style} />
              <PropertyTagItem property="Subject" value={auction?.subject} />
            </Stack>

            <PropertyTagItem property="Size" value={auction?.size} />

            <Button
              className="w-fit"
              style={{
                padding: "1rem 0",
                backgroundColor: "rgb(108 99 255 / 0.9)",
                margin: "0 auto 12px",
                display: "inline-block",
                width: "100%",
              }}
              onClick={(e) => {
                e.preventDefault();
                deleteHandler();
              }}
              variant="contained"
              color="success"
            >
              Delete
            </Button>
            <Button
              className="w-fit"
              style={{
                padding: "1rem 0",
                backgroundColor: "rgb(108 99 255 / 0.9)",
                margin: "0 auto",
                display: "inline-block",
                width: "100%",
              }}
              onClick={(e) => {
                e.preventDefault();
                router.push(`/auction/${id}/edit?type=artist`);
              }}
              variant="contained"
              color="success"
            >
              Edit
            </Button>
          </Stack>
        </Stack>
        <Box
          component={"div"}
          sx={{
            flex: 1,

            margin: "0 auto",
          }}
        >
          {auction?.images && auction.images.length > 0 && (
            <EmblaCarousel slides={auction?.images} options={OPTIONS} />
          )}
        </Box>
      </Stack>
    </Box>
  );
}
