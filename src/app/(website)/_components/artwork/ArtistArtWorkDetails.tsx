"use client";
import "../carousel/embla.css";
import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import PropertyTagItem from "./PropertTagItem";
import LandingLoader from "../landingLoader/landingLoader";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  deleteMyProduct,
  getMeProduct,
  getProduct,
} from "@/app/(admin)/_actions/products";
import { addProductToCart, getMyCart } from "@/actions/users";
import { toast } from "sonner";
import { Cart, Product } from "@/types";
import EmblaCarousel from "../carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

export default function ArtistArtWorkDetails() {
  const router = useRouter();

  const { id } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  console.log("myid", id);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["products", "me", id],
      refetchType: "all",
    });

    toast.dismiss();
  }, [pathname]);

  const userQueries = useQueries({
    queries: [
      {
        queryKey: ["products", "me", id],
        queryFn: () => getMeProduct(id as string),
      },
    ],
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteMyProduct,
    onSuccess: (d) => {
      if (d.data?.code === 201) {
        toast.success("proudct added to cart successfully!", {
          onAutoClose: () => {
            router.push(`/gallery?type=artist`);
          },
        });
        queryClient.invalidateQueries({
          queryKey: ["products", id],
          refetchType: "all",
        });
        queryClient.invalidateQueries({
          queryKey: ["cart"],
          refetchType: "all",
        });
        return;
      }
      toast.error("Couldnot add product to cart!");
      console.log(d);
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const deleteProductHandler = () => {
    deleteProductMutation.mutate(id as string);
  };

  const { isLoading } = userQueries[0];

  const product: Product = userQueries[0].data?.data?.data;

  const OPTIONS: EmblaOptionsType = {};

  if (isLoading) {
    return <LandingLoader />;
  }

  if (!product) {
    return <div>product not found!</div>;
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
              {product?.title}
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
              {product?.description}
              <Typography
                component="p"
                variant="body2"
                position="absolute"
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
                {product?.category}
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
                {product?.price}
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
                {product?.owner?.name}
              </Typography>
            </Stack>

            <PropertyTagItem property="Material" value={product?.material} />
            <PropertyTagItem property="Style" value={product?.style} />
            <PropertyTagItem property="Subject" value={product?.subject} />
            <PropertyTagItem property="Dimension" value={product?.size} />
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
                deleteProductHandler();
              }}
              variant="contained"
              color="success"
            >
              Delete Product
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
                router.push(`/gallery/${id}/edit?type=artist`);
              }}
              variant="contained"
              color="success"
            >
              Edit Product
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
          {product?.images && product.images.length > 0 && (
            <EmblaCarousel slides={product?.images} options={OPTIONS} />
          )}
        </Box>
      </Stack>
    </Box>
  );
}
