"use client";
import "../carousel/embla.css";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";

import LandingLoader from "../landingLoader/landingLoader";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { getProduct } from "@/app/(admin)/_actions/products";
import {
  addProductToCart,
  getAuctionDetails,
  getMyCart,
  registerAuction,
  updateAuctionPrice,
} from "@/actions/users";
import { toast } from "sonner";
import { Auction, Cart, Product } from "@/types";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import PropertyTagItem from "../artwork/PropertTagItem";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useSocket } from "@/hooks/useSocket";
// import { socket } from "../../../../socket";
// import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function UserAuctionDetails() {
  const router = useRouter();
  //   const { id } = router.query;
  const { id } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  //   const [price, setPrice] = useState<ChangeEvent<HTMLInputElement> | string>(
  //     ""
  //   );

  const { isConnected, price, setPrice, error, setError } = useSocket();

  console.log("myid", id);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["auction", "product", id],
      refetchType: "all",
    });
    // queryClient.invalidateQueries({ queryKey: ["cart"], refetchType: "all" });
    toast.dismiss();
  }, [pathname]);

  // const eventQuery = useQuery({
  //   queryKey: ["events", id],
  //   queryFn: () => getEvent(id as string),
  // });

  // const userEventQuery = useQuery({
  //   queryKey: ["users", "bookEvent"],
  //   queryFn: () => getUserEvents(),
  // });

  const auctionQuery = useQueries({
    queries: [
      {
        queryKey: ["auction", "product", id],
        queryFn: () => getAuctionDetails(id as string),
      },
      //   {
      //     queryKey: ["cart"],
      //     queryFn: () => getMyCart(),
      //   },
    ],
  });

  const bidMutatuin = useMutation({
    mutationFn: (values: { id: string; finalPrice: string }) =>
      updateAuctionPrice(values.id, values.finalPrice),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Your bid has been placed successfully!");
        //   queryClient.invalidateQueries({
        //     queryKey: ["products", id],
        //     refetchType: "all",
        //   });
        //   queryClient.invalidateQueries({
        //     queryKey: ["cart"],
        //     refetchType: "all",
        //   });
        return;
      }
      toast.error("Couldn't bid!");
      console.log(d);
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: (id: string) => registerAuction(id),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        window.open(d.data?.data?.url, "_blank");
        toast.success("You have registered successfully!");
        router.push("/auction");
        //   queryClient.invalidateQueries({
        //     queryKey: ["products", id],
        //     refetchType: "all",
        //   });
        //   queryClient.invalidateQueries({
        //     queryKey: ["cart"],
        //     refetchType: "all",
        //   });
        return;
      }
      toast.error("Couldn't register, try again later!");
      console.log(d);
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const registerMutationHandler = () => {
    registerMutation.mutate(id as string);
  };

  // const user: userBookedEvent = userQueries
  const { isLoading } = auctionQuery[0];
  // const { isLoading: isUserLoading } = userQueries[1];
  const auction: Auction = auctionQuery[0].data?.data?.data;
  //   const cart: Cart = userQueries[1].data?.data?.data;
  //   const inCart =
  //     cart?.cartItems &&
  //     cart?.cartItems.filter((cartItem: any) => cartItem?.product?.id == id)
  //       .length > 0;
  //   console.log(userQueries);

  // const user: userBookedEvent = userEventQuery.data?.data?.data;
  // console.log(user);
  // const { isLoading: isUserLoading } = userEventQuery;
  // const { isLoading } = eventQuery;
  // const event: Event = eventQuery.data?.data?.data;
  // console.log("myEvent");
  // console.log(eventQuery);

  const OPTIONS: EmblaOptionsType = {};
  // const SLIDE_COUNT = 5
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys())
  useEffect(() => {
    setPrice(
      auction?.lastPrices[auction?.lastPrices.length - 1]?.price + "" ||
        auction?.price + ""
    );
  }, [auction]);
  if (isLoading) {
    return <LandingLoader />;
  }

  if (!auction) {
    return <div>auction not found!</div>;
  }

  //   if (isConnected) {
  //     console.log("connnnnnnnnnnnnnnnnnnnnnnnnnnnnected");
  //     socket.on("Bid", (value) => {
  //       // ...
  //       console.log("value", value);
  //       setPrice(value);
  //     });
  //   }

  function bidHandler(value: string) {
    console.log("emit", value);
    // socket.emit("Bid", value,() =>{
    //     console.log("emiiiiiiiiiiiiiiiiiiiiittted")
    // });
    // socket.timeout(5000).emit('Bid', value, () => {
    //     // setIsLoading(false);
    //     console.log("emiiiiiiiiiiiiiiiiiiiiittted")
    //   });
    bidMutatuin.mutate({ id: id as string, finalPrice: price });
    setPrice("");
  }

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
            {/* {isConnected && "connected"} */}
            {/* <FormControl> */}
            {/* <FormField
              control={}
              name="bid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Choose picture</FormLabel>
                  <FormControl>
                    <Input
                      //   defaultValue={user?.email}
                      value={
                        price ||
                        auction?.lastPrices[auction?.lastPrices.length - 1]
                          ?.price ||
                        auction?.price
                      }
                      onChange={(value) => {
                        bidHandler(value);
                      }}
                      type="number"
                      placeholder="bid"
                      //   disabled={true}
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <input
              value={price}
              onChange={(e) => {
                const reg = new RegExp("^[0-9]+$");
                console.log(reg.test(e.target.value));
                console.log(reg, e.target.value);
                if (!reg.test(e.target.value)) {
                  setError("please enter a valid number");
                } else {
                  setError("");
                }
                setPrice(e.target.value);
              }}
              type="text"
              placeholder="bid"
              //   disabled={true}
            />
            {/* </FormControl> */}
            {error && (
              <Typography
                component="p"
                variant="body1"
                marginBottom={"0"}
                // fontWeight={"bold"}
                fontSize={".9rem"}
                color="red"
                maxWidth="400px"
              >
                {error}
              </Typography>
            )}
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
                //   router.push("/loginType");
                // isBooked? router.push("/vr"):""
                //----
                // if (inCart) {
                //   router.push("/cart");
                //   return;
                // }
                // addToCartHandler();

                if (auction?.userRegisteredInThisAuction) {
                  console.log("btn cliicked", price);

                  const lastBid =
                    auction?.lastPrices[auction?.lastPrices.length - 1]
                      ?.price || auction?.price;

                  if (parseInt(price) <= lastBid * 1) {
                    setError(
                      "Your Bid price should be higher than the last bid"
                    );
                    return;
                  } else if (!price) {
                    setError("Bid price can't be empty");
                    return;
                  }
                  bidHandler(price);
                  return;
                }
                registerMutationHandler();
              }}
              variant="contained"
              color="success"
              disabled={!!error}
              // disabled={
              //   isBooked
              //     ? isDateWithingTwoDates(
              //         new Date().toISOString(),
              //         event?.began,
              //         event?.end
              //       )
              //     : isDateWithingTwoDates(
              //         new Date().toISOString(),
              //         event?.createdAt,
              //         event?.began
              //       )
              // }
            >
              {/* {isBooked ? "Launch VR Mode" : "Book Exhibtion"} */}
              {/* {inCart ? "view item on cart" : "Add to cart"} */}

              {auction?.userRegisteredInThisAuction ? "Bid" : "Register"}
            </Button>
          </Stack>
        </Stack>
        <Box
          component={"div"}
          sx={{
            flex: 1,
            //  width: "400px",
            //   height: "400px",
            margin: "0 auto",
          }}
        >
          {/* <img
            src={auction?.coverImage?.image || "/services-1.svg"}
            alt="img"
            style={{ height: "100%", width: "100%" }}
          /> */}
          {/*auction?.images && auction.images.length > 0 && (
            <Carousel>
              {auction.images.map((auction, i) => (
                <div key={auction?.imageId}>
                  <img src={auction?.image} />
                  <p className="legend">{`Legend ${i}`}</p>
                </div>
              ))}
            </Carousel>
          )*/}
          {auction?.images && auction.images.length > 0 && (
            <EmblaCarousel slides={auction?.images} options={OPTIONS} />
          )}
        </Box>
      </Stack>
    </Box>
  );
}
