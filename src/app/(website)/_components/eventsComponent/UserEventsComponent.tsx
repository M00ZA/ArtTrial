"use client";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import ExhibitionCard from "../cards/ExhibtionCard";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getEvents } from "@/app/(admin)/_actions/events";
import { Event } from "@/types";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LandingLoader from "../landingLoader/landingLoader";

export default function UserEventsComponent() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["events"] });
  }, [pathname]);
  //   console.log(page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    setPage(value);
  };
  const eventsQuery = useQuery({
    queryKey: ["events", page],
    queryFn: () =>
      getEvents({
        page,
        limit: 20,
      }),
    placeholderData: keepPreviousData,
  });
  const { isLoading, data, isError } = eventsQuery;

  const count = data?.data?.data?.pagination?.numbersOfPages || 1;

  console.log(data?.data?.data?.pagination);
  //   // Prefetch the next page!
  //   useEffect(() => {
  //       if (!isPreviousData && data?.hasMore) {
  //         queryClient.prefetchQuery({
  //           queryKey: ['projects', page + 1],
  //           queryFn: () => fetchProjects(page + 1),
  //         })
  //       }
  //     }, [data, isPreviousData, page, queryClient])

  // Prefetch the next page!
  useEffect(() => {
    if (page < count) {
      queryClient.prefetchQuery({
        queryKey: ["events", page + 1],
        queryFn: () =>
          getEvents({
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
        txt="Events"
        paginated={true}
        count={count}
        page={page}
        handleChange={handleChange}
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
              />
            );
          })}
      </SectionWrapper>
    </>
  );
}
