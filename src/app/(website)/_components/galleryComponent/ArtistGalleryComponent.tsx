"use client";
import { Box } from "@mui/material";
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
import { getMeProducts, getProducts } from "@/app/(admin)/_actions/products";
import { Product } from "@/types";
import LinkBtn from "../linkBtn/LinkBtn";

export default function ArtistGalleryComponent() {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  }, [pathname]);
  //   console.log(page);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log(value);
    setPage(value);
  };
  const productsQuery = useQuery({
    queryKey: ["products", "me", page],
    queryFn: () =>
      getMeProducts({
        page,
        limit: 20,
      }),
    placeholderData: keepPreviousData,
  });
  const { isLoading, data, isError } = productsQuery;

  const count = data?.data?.data?.pagination?.numbersOfPages || 1;

  console.log(data?.data?.data?.pagination);

  useEffect(() => {
    if (page < count) {
      queryClient.prefetchQuery({
        queryKey: ["products", "me", page + 1],
        queryFn: () =>
          getMeProducts({
            page: page + 1,
            limit: 20,
          }),
      });
    }
  }, [data, page, queryClient, count]);

  const products: Product[] = data?.data?.data?.products;
  console.log(products);

  if (isLoading) {
    return <LandingLoader />;
  }

  return (
    <>
      <SectionWrapper
        txt="Gallery"
        paginated={true}
        count={count}
        page={page}
        handleChange={handleChange}
        noBottomBorder
      >
        {products &&
          products.map((product) => (
            <VerticalCard
              imgUrl={product.coverImage.image}
              title={product.title}
              name={product.owner.name}
              category={product.category}
              key={product.id}
              id={product.id}
              isArtist
            />
          ))}
      </SectionWrapper>
      <LinkBtn href={"/gallery/add?type=artist"} label={"Add Artwork"} />
    </>
  );
}
