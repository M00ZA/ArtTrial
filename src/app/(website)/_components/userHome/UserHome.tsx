"use client";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import ExhibitionCard from "../cards/ExhibtionCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents } from "@/app/(admin)/_actions/events";
import { Event } from "@/types";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function UserHome() {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["events"] });
  }, [pathname]);

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      getEvents({
        page: 1,
        limit: 3,
      }),
  });

  const { isLoading, data, isError } = eventsQuery;
  const events: Event[] = data?.data?.data?.events;
  console.log(events);

  return (
    <>
      <SectionWrapper txt="Explore Events" seeMore="/events">
        {isError && <div>Something went wrong please try again later</div>}
        {isLoading && <div>Loading...</div>}
        {events &&
          events.length > 0 &&
          events.map((event) => (
            <ExhibitionCard
              title={event.title}
              range={`${event.duration} days`}
              date={event.began}
              name={event.owner.name}
              imgUrl={event.coverImage || ""}
              key={event.id}
              id={event.id}
            />
          ))}
      </SectionWrapper>
    </>
  );
}
