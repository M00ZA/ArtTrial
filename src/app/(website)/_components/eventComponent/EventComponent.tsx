"use client";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import VerticalCard from "../../_components/cards/VerticalCard";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getEvent } from "@/app/(admin)/_actions/events";
import { Event, userBookedEvent } from "@/types";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGetUserEvents } from "@/hooks/useGetUserProfile";
import { bookEvent, getUserEvents } from "@/actions/users";
import { Loader } from "@/components/loader";
import LandingLoader from "../landingLoader/landingLoader";
import { toast } from "sonner";

function getTime(isoDate: string) {
  return new Date(isoDate).getTime;
}

function isDateWithingTwoDates(
  dateToCheck: string,
  beginDate: string,
  endDate: string
) {
  const dateToCheckTime = getTime(dateToCheck);
  const beginDateTime = getTime(beginDate);
  const endDateTime = getTime(endDate);

  return dateToCheckTime >= beginDateTime && dateToCheckTime < endDateTime;
}

export default function EventComponent() {
  const router = useRouter();
  //   const { id } = router.query;
  const { id } = useParams();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["events", id] });
    queryClient.invalidateQueries({ queryKey: ["users", "bookEvent"] });
  }, [pathname]);

  // const eventQuery = useQuery({
  //   queryKey: ["events", id],
  //   queryFn: () => getEvent(id as string),
  // });

  // const userEventQuery = useQuery({
  //   queryKey: ["users", "bookEvent"],
  //   queryFn: () => getUserEvents(),
  // });

  const userQueries = useQueries({
    queries: [
      {
        queryKey: ["events", id],
        queryFn: () => getEvent(id as string),
      },
      {
        queryKey: ["users", "bookEvent"],
        queryFn: () => getUserEvents(),
      },
    ],
  });

  const bookEventMutation = useMutation({
    mutationFn: bookEvent,
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Event booked successfully!", {
          onAutoClose(toast) {
            router.refresh();
          },
        });

        return;
      }
      toast.error("Couldnot booked event!");
      console.log(d);
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const eventBookingHandler = () => {
    queryClient.invalidateQueries({ queryKey: ["events", id] });
    queryClient.invalidateQueries({ queryKey: ["users", "bookEvent"] });
    bookEventMutation.mutate(id as string);
  };

  // const user: userBookedEvent = userQueries
  const { isLoading } = userQueries[0];
  // const { isLoading: isUserLoading } = userQueries[1];
  const event: Event = userQueries[0].data?.data?.data;
  const user: userBookedEvent = userQueries[1].data?.data?.data;
  const isBooked = user?.events.filter((e) => e.id == id).length > 0;
  console.log(useQueries);

  // const user: userBookedEvent = userEventQuery.data?.data?.data;
  // console.log(user);
  // const { isLoading: isUserLoading } = userEventQuery;
  // const { isLoading } = eventQuery;
  // const event: Event = eventQuery.data?.data?.data;
  // console.log("myEvent");
  // console.log(eventQuery);

  if (isLoading) {
    return <LandingLoader />;
  }

  if (!event) {
    return <div>event not found!</div>;
  }

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
                key={product.id}
                id={product.id}
              />
            ))}
        </Box>
        <Box component="div" sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="w-fit"
            style={{
              padding: "1rem 0",
              backgroundColor: "rgb(108 99 255 / 0.9)",
              margin: "0 auto",
              display: "inline-block",
              width: "82%",
            }}
            onClick={() => {
              //   router.push("/loginType");
              // isBooked? router.push("/vr"):""
              if (isBooked) {
                router.push("/vr?e=" + id);
                return;
              }
              eventBookingHandler();
            }}
            variant="contained"
            color="success"
            disabled={
              isBooked
                ? isDateWithingTwoDates(
                    new Date().toISOString(),
                    event?.began,
                    event?.end
                  )
                : isDateWithingTwoDates(
                    new Date().toISOString(),
                    event?.createdAt,
                    event?.began
                  )
            }
          >
            {isBooked ? "Launch VR Mode" : "Book Exhibtion"}
          </Button>
        </Box>
      </Box>
    </>
  );
}
