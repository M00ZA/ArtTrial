"use client";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import ExhibitionCard from "../cards/ExhibtionCard";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getMeEvents } from "@/app/(admin)/_actions/events";
import { Event } from "@/types";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LandingLoader from "../landingLoader/landingLoader";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

export default function ArtistEventsComponent() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["events", "me"] });
  }, [pathname]);
  //   console.log(page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    setPage(value);
  };
  const eventsQuery = useQuery({
    queryKey: ["events", "me", page],
    queryFn: () =>
      getMeEvents({
        page,
        limit: 20,
      }),
    placeholderData: keepPreviousData,
  });
  const { isLoading, data, isError } = eventsQuery;

  const count = data?.data?.data?.pagination?.numbersOfPages || 1;

  console.log(data?.data?.data?.pagination);

  // Prefetch the next page!
  useEffect(() => {
    if (page < count) {
      queryClient.prefetchQuery({
        queryKey: ["events", "me", page + 1],
        queryFn: () =>
          getMeEvents({
            page: page + 1,
            limit: 1,
          }),
      });
    }
  }, [data, page, queryClient, count]);

  const events: Event[] = data?.data?.data?.events;
  console.log(events);

  if (isLoading) {
    return <LandingLoader />;
  }

  return (
    <>
      <SectionWrapper
        txt="Your Events"
        paginated={true}
        count={count}
        page={page}
        handleChange={handleChange}
        noBottomBorder
      >
        {isError && <div>Something went wrong please try again later</div>}
        {events &&
          events.length > 0 &&
          events.map((event) => {
            return (
              <ExhibitionCard
                title={event.title}
                range={`${event.duration} days`}
                date={event.began}
                name={event.owner.name}
                imgUrl={event.coverImage || ""}
                key={event.id}
                id={event.id}
                isArtist={true}
              />
            );
          })}
      </SectionWrapper>
      <Box
        component="div"
        sx={{
          paddingBottom: "20px",
          borderBottom: "2px solid #DBB97B",
        }}
      >
        <Link
          href={"/events/add?type=artist"}
          style={{
            maxWidth: "200px",
            textAlign: "center",
            margin: "0 auto",
            display: "block",
          }}
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
              borderRadius: "4px",
            }}
          >
            Add Event
          </Typography>
        </Link>
      </Box>
    </>
  );
}
