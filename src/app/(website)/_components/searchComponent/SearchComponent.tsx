"use client";
import SectionWrapper from "../sectionWrapper/SectionWrapper";
import ExhibitionCard from "../cards/ExhibtionCard";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEvents } from "@/app/(admin)/_actions/events";
import { Auction, Event, Product } from "@/types";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import LandingLoader from "../landingLoader/landingLoader";
import { getProducts } from "@/app/(admin)/_actions/products";
import VerticalCard from "../cards/VerticalCard";
import { getAuctions, getSearchResults } from "@/actions/users";
import VerticalGenericCard from "../cards/VerticalGenericCard";
import AuctionTxt from "../auctionComponent/AuctionTxt";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import SearchBar from "../searchComponent/SearchBar";
import { Typography } from "@mui/material";
import LandingError from "../landingError/landingError";

export default function SearchComponent() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const [searchTerm, setSearchTerm] = useState(search as string);
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["search"] });
  }, [pathname]);

  const searchQuery = useQueries({
    queries: [
      {
        queryKey: ["search"],
        queryFn: () => getSearchResults(searchTerm as string),
      },
    ],
  });
  const { isLoading, data, isError } = searchQuery[0];
  const events: Event[] = data?.data?.data?.events;
  const products: Product[] = data?.data?.data?.products;
  const auctions: Auction[] = data?.data?.data?.auctions;
  const searchResultCount = products?.length + events?.length;
  console.log(events);

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);

    return params.toString();
  };

  function searchHandler() {
    if (!searchTerm) return;
    // localStorage.setItem("searchTerm",searchTerm)
    router.push(`/search?${createQueryString("q", searchTerm)}`);
    queryClient.resetQueries({ queryKey: ["search"], exact: true });
    queryClient.removeQueries({ queryKey: ["search"], exact: true });
    // router.refresh();
  }

  //   if (isLoading) {
  //     return <LandingLoader />;
  //   }
  //   {
  //     isError && <LandingError />;
  //   }

  return (
    <>
      <SearchBar
        search={searchTerm}
        searchHandler={searchHandler}
        setSearch={setSearchTerm}
      />
      <Typography
        component="p"
        variant="body1"
        textAlign={"center"}
        // position={"relative"}
        marginBottom={"0px"}
        // lineHeight={"4rem"}
      >
        {`${isLoading ? "" : searchResultCount} results`}
      </Typography>
      {isError ? (
        <LandingError />
      ) : isLoading ? (
        <LandingLoader />
      ) : (
        <>
          {events && events.length > 0 && (
            <SectionWrapper txt="Explore Events">
              {events.map((event) => (
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
          )}
          {products && products.length > 0 && (
            <SectionWrapper txt="Explore Gallery">
              {products.map((product) => (
                <VerticalCard
                  imgUrl={product.coverImage as unknown as string}
                  title={product.title}
                  name={product.owner.name}
                  category={product.category}
                  key={product.id}
                  id={product.id}
                />
              ))}
            </SectionWrapper>
          )}
          {auctions && auctions.length > 0 && (
            <SectionWrapper txt="Explore Auctions">
              {auctions.map((auction) => (
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
          )}
        </>
      )}
    </>
  );
}
