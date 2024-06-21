"use client";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import ExhibitionCard from "../cards/ExhibtionCard";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents, getMeEvents } from "@/app/(admin)/_actions/events";
import { Auction, Event, Product } from "@/types";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LandingLoader from "../landingLoader/landingLoader";
import { getMeProducts, getProducts } from "@/app/(admin)/_actions/products";
import VerticalCard from "../cards/VerticalCard";
import { getAuctions, getMyAuctions } from "@/actions/users";
import VerticalGenericCard from "../cards/VerticalGenericCard";
import AuctionTxt from "../auctionComponent/AuctionTxt";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchBar from "../searchComponent/SearchBar";

export default function ArtistHome() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["events", "me"] });
  }, [pathname]);

  const eventsQuery = useQuery({
    queryKey: ["events", "me"],
    queryFn: () =>
      getMeEvents({
        page: 1,
        limit: 3,
      }),
  });

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      getMeProducts({
        page: 1,
        limit: 3,
      }),
  });

  const auctionQuery = useQuery({
    queryKey: ["auctions"],
    queryFn: () =>
      getMyAuctions({
        page: 1,
        limit: 3,
      }),
  });

  const { isLoading, data, isError } = eventsQuery;
  const events: Event[] = data?.data?.data?.events;
  const products: Product[] = productsQuery?.data?.data?.data?.products;
  const auctions: Auction[] = auctionQuery?.data?.data?.data?.auctions;
  console.log(events);

  if (isLoading) {
    return <LandingLoader />;
  }

  return (
    <>
      <SectionWrapper txt="Explore Your Events" seeMore="/events?type=artist">
        {isError && <div>Something went wrong please try again later</div>}
        {/* {isLoading && <LandingLoader />} */}
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
      <SectionWrapper txt="Explore Your Gallery" seeMore="/gallery?type=artist">
        {products &&
          products.map((product) => (
            <VerticalCard
              imgUrl={product.coverImage.image}
              title={product.title}
              name={product.owner.name}
              category={product.category}
              key={product.id}
              id={product.id}
            />
          ))}
      </SectionWrapper>
      <SectionWrapper
        txt="Explore Your Auctions"
        seeMore="/auction?type=artist"
      >
        {auctions &&
          auctions.map((auction) => (
            <VerticalGenericCard
              imgUrl={auction.coverImage.image}
              title={auction.title}
              name={auction.artist.name}
              category={auction.category}
              key={auction.id}
              id={auction.id}
              url="auction"
            >
              <AuctionTxt
                title={auction.title}
                name={auction.artist.name}
                key={auction.id}
                id={auction.id}
                description={auction.description}
                price={auction.price}
              />
            </VerticalGenericCard>
          ))}
      </SectionWrapper>
    </>
  );
}
