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
import { getAuctions } from "@/actions/users";
import VerticalGenericCard from "../cards/VerticalGenericCard";
import AuctionTxt from "./AuctionTxt";

const data = {
  pagination: {
    currentPage: 1,
    limit: 10,
    numbersOfPages: 1,
    totalResults: 2,
  },
  products: [
    {
      id: "6625b5c02d5ea430a997a572",
      title: "test",
      description:
        "test your knowledge of the gym and pool and spa and salon and spa and salon and spa and salon and spa and salon and spa and salon and spa and salon and spa and salon and spa and ",
      price: 10000,
      isAvailable: true,
      owner: {
        id: "662420c7e77489015ce9fff6",
        name: "يوسف ثابت",
        profileImg:
          "https://res.cloudinary.com/art-space/image/upload/v1713645673/artist/artist-869709152-1713645673621.jpg",
      },
      category: "Acrylic",
      style: "impressionistic",
      subject: "cityscapes",
      size: "5h * 5.6w * 0.5d",
      coverImage: {
        imageId: "product/product-842021961-1713747391431",
        image:
          "https://res.cloudinary.com/art-space/image/upload/v1713747391/product/product-842021961-1713747391431.jpg",
      },
      material: "drgh",
      inEvent: false,
    },
    {
      id: "664e082dfe0c518997d18dde",
      title: "test1 updated from me",
      description:
        "this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app ",
      price: 160,
      isAvailable: true,
      owner: {
        id: "662420c7e77489015ce9fff6",
        name: "يوسف ثابت",
        profileImg:
          "https://res.cloudinary.com/art-space/image/upload/v1713645673/artist/artist-869709152-1713645673621.jpg",
      },
      category: "Acrylic",
      style: "Digital",
      subject: "Still life",
      size: "3h * 5w * 0.6d",
      coverImage: {
        imageId: "product/product-426556841-1716389930674",
        image:
          "https://res.cloudinary.com/art-space/image/upload/v1716389931/product/product-426556841-1716389930674.jpg",
      },
      material: "paper",
      inEvent: false,
    },
    {
      id: "664e082dfe0c518997d18dd1",
      title: "test1 updated from me",
      description:
        "this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app ",
      price: 160,
      isAvailable: true,
      owner: {
        id: "662420c7e77489015ce9fff6",
        name: "يوسف ثابت",
        profileImg:
          "https://res.cloudinary.com/art-space/image/upload/v1713645673/artist/artist-869709152-1713645673621.jpg",
      },
      category: "Acrylic",
      style: "Digital",
      subject: "Still life",
      size: "3h * 5w * 0.6d",
      coverImage: {
        imageId: "product/product-426556841-1716389930674",
        image:
          "https://res.cloudinary.com/art-space/image/upload/v1716389931/product/product-426556841-1716389930674.jpg",
      },
      material: "paper",
      inEvent: false,
    },
    {
      id: "664e082dfe0c518997d18dd2",
      title: "test1 updated from me",
      description:
        "this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app ",
      price: 160,
      isAvailable: true,
      owner: {
        id: "662420c7e77489015ce9fff6",
        name: "يوسف ثابت",
        profileImg:
          "https://res.cloudinary.com/art-space/image/upload/v1713645673/artist/artist-869709152-1713645673621.jpg",
      },
      category: "Acrylic",
      style: "Digital",
      subject: "Still life",
      size: "3h * 5w * 0.6d",
      coverImage: {
        imageId: "product/product-426556841-1716389930674",
        image:
          "https://res.cloudinary.com/art-space/image/upload/v1716389931/product/product-426556841-1716389930674.jpg",
      },
      material: "paper",
      inEvent: false,
    },
    {
      id: "664e082dfe0c518997d18dd3",
      title: "test1 updated from me",
      description:
        "this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app ",
      price: 160,
      isAvailable: true,
      owner: {
        id: "662420c7e77489015ce9fff6",
        name: "يوسف ثابت",
        profileImg:
          "https://res.cloudinary.com/art-space/image/upload/v1713645673/artist/artist-869709152-1713645673621.jpg",
      },
      category: "Acrylic",
      style: "Digital",
      subject: "Still life",
      size: "3h * 5w * 0.6d",
      coverImage: {
        imageId: "product/product-426556841-1716389930674",
        image:
          "https://res.cloudinary.com/art-space/image/upload/v1716389931/product/product-426556841-1716389930674.jpg",
      },
      material: "paper",
      inEvent: false,
    },
    {
      id: "664e082dfe0c518997d18dd4",
      title: "test1 updated from me",
      description:
        "this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app this is first artwork from mobile appthis is first artwork from mobile app this is first artwork from mobile app ",
      price: 160,
      isAvailable: true,
      owner: {
        id: "662420c7e77489015ce9fff6",
        name: "يوسف ثابت",
        profileImg:
          "https://res.cloudinary.com/art-space/image/upload/v1713645673/artist/artist-869709152-1713645673621.jpg",
      },
      category: "Acrylic",
      style: "Digital",
      subject: "Still life",
      size: "3h * 5w * 0.6d",
      coverImage: {
        imageId: "product/product-426556841-1716389930674",
        image:
          "https://res.cloudinary.com/art-space/image/upload/v1716389931/product/product-426556841-1716389930674.jpg",
      },
      material: "paper",
      inEvent: false,
    },
  ],
};

export default function AuctionComponent() {
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
      getAuctions({
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
    <SectionWrapper
      txt="Auctions"
      paginated={true}
      count={count}
      page={page}
      handleChange={handleChange}
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
  );
}
