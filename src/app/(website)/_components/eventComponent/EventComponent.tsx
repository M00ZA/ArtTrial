"use client";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import VerticalCard from "../../_components/cards/VerticalCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvent } from "@/app/(admin)/_actions/events";
import { Event } from "@/types";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EventComponent() {
  //   const router = useRouter();
  //   const { id } = router.query;
  const { id } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["events", id] });
  }, [pathname]);
  const eventQuery = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEvent(id as string),
  });

  const event: Event = eventQuery.data?.data?.data;
  console.log("myEvent");
  console.log(eventQuery);
  return (
    <>
      <Box
        component="div"
        padding="20px"
        sx={{
          maxWidth: { xs: "390px", md: "900px" },
          margin: "0 auto",
        }}
      >
        <Box
          component="div"
          // padding="20px"
          sx={{
            // maxWidth: { xs: "390px", md: "900px" },
            // margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            component="div"
            maxWidth="390px"
            height={"390px"}
            overflow="hidden"
            borderRadius={{ xs: "12px", md: "12px 0 0 12px" }}
            border="1px solid gray"
            borderRight={{ xs: "1px solid gray", md: "0px" }}
          >
            {/* <Image
              src={event?.coverImage || "/services-1.svg"}
              alt="exhibtion image"
              height={300}
              width={390}
            /> */}
            <img
              src={event?.coverImage || "/services-1.svg"}
              alt="img"
              style={{ height: "100%" }}
            />
          </Box>
          <Box
            component="div"
            maxWidth={350}
            sx={{
              margin: { xs: "0 auto", md: "initial" },
              padding: "12px",
              border: "1px solid gray",
              borderLeft: { xs: "1px solid gray", md: "0" },
              borderRadius: { xs: "12px", md: "0 12px 12px 0" },
              height: "391px",
            }}
          >
            <Typography
              component="h3"
              variant="body1"
              marginBottom={".4rem"}
              fontWeight={"bold"}
            >
              {event?.title}
            </Typography>
            <Typography component="h3" variant="body1" marginBottom={".4rem"}>
              {event?.description}
            </Typography>
            <Typography
              component="p"
              variant="body2"
              // fontSize={".6rem"}
              color={"#7469B6"}
              textAlign="right"
              // sx={{
              //   display: "flex",
              //   alignItems: "center",
              //   marginBottom: "6px",
              // }}
            >
              {event?.owner?.name}
            </Typography>
            <Box component="div">
              <Typography
                component="p"
                variant="body2"
                // fontSize={".6rem"}
                color={"#7469B6"}
              >
                From :{" "}
                <Typography
                  component="span"
                  variant="body2"
                  // fontSize={".6rem"}
                  color={"black"}
                >
                  {event?.began
                    ? new Date(event.began).toLocaleDateString()
                    : "No date"}
                </Typography>
              </Typography>
              <Box component="div" display={"flex"}>
                <Typography
                  component="p"
                  variant="body2"
                  // fontSize={".6rem"}
                  color={"#7469B6"}
                >
                  To :{" "}
                  <Typography
                    component="span"
                    variant="body2"
                    // fontSize={".6rem"}
                    color={"black"}
                  >
                    {event?.end
                      ? new Date(event.end).toLocaleDateString()
                      : "No date"}
                  </Typography>
                </Typography>
                <Typography
                  component="p"
                  variant="body2"
                  // fontSize={".6rem"}
                  color={"#7469B6"}
                  marginLeft="auto"
                >
                  {event?.duration + " "} days
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          component="section"
          sx={{
            padding: { xs: "20px 0", md: "20px" },
            display: "grid",
            // flexDirection: { xs: "column", md: "row" },
            // alignItems: "center",
            // justifyContent: "space-evenly",
            // flexWrap: "wrap",
            // gap: { xs: "1.6rem", md: "4rem" },
            // margin: "0 auto",
            gridTemplateColumns: {
              xs: "1fr ",
              md: "1fr 1fr ",
              lg: "1fr 1fr ",
            },
            placeItems: "center",
            // marginTop: "20px",
            gap: ".5rem",
          }}
        >
          {event?.products &&
            event?.products.map((product) => (
              <VerticalCard
                imgUrl={product.coverImage}
                title={product.title}
                name={product.owner.name}
                category={product.category}
                key={event.id}
              />
            ))}
        </Box>
        {/* <Button
          className="w-fit"
          style={{ padding: "0px 40px" }}
          onClick={() => {
            //   router.push("/loginType");
          }}
          variant="contained"
          color="success"
          sx={{ background: "black" }}
        >
          Login
        </Button> */}
      </Box>
    </>
  );
}
