"use client";
import VerticalCard from "../../_components/cards/VerticalCard";
import SectionWrapper from "../../_components/sectionWrapper/SectionWrapper";
import { usePathname } from "next/navigation";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";
import LandingLoader from "../landingLoader/landingLoader";
import { Auction, Product } from "@/types";
import { getAuctions, getMyAuctions } from "@/actions/users";
import VerticalGenericCard from "../cards/VerticalGenericCard";
import AuctionTxt from "./AuctionTxt";
import LinkBtn from "../linkBtn/LinkBtn";

export default function ArtistAuctionComponent() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["auctions"] });
  }, [pathname]);
  //   console.log(page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    setPage(value);
  };
  const auctionQuery = useQuery({
    queryKey: ["auctions", page],
    queryFn: () =>
      getMyAuctions({
        page,
        limit: 20,
      }),
    placeholderData: keepPreviousData,
  });
  const { isLoading, data, isError } = auctionQuery;

  const count = data?.data?.data?.pagination?.numbersOfPages || 1;

  console.log(data?.data?.data?.pagination);

  useEffect(() => {
    if (page < count) {
      queryClient.prefetchQuery({
        queryKey: ["auctions", page + 1],
        queryFn: () =>
          getAuctions({
            page: page + 1,
            limit: 20,
          }),
      });
    }
  }, [data, page, queryClient, count]);

  const auctions: Auction[] = data?.data?.data?.auctions;
  console.log(auctions);

  if (isLoading) {
    return <LandingLoader />;
  }

  return (
    <>
      <SectionWrapper
        txt="Auctions"
        paginated={true}
        count={count}
        page={page}
        handleChange={handleChange}
        noBottomBorder
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
              isArtist
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
      <LinkBtn href={"/auction/add?type=artist"} label={"Add Auction"} />
    </>
  );
}
