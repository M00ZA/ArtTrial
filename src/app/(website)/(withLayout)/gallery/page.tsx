import { Box } from "@mui/material";
import VerticalCard from "../../_components/cards/VerticalCard";
import SectionWrapper from "../../_components/sectionWrapper/SectionWrapper";
import GalleryComponent from "../../_components/galleryComponent/GalleryComponent";

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

export default function Gallery() {
  // const [page, setPage] = useState(1);
  return (
    <GalleryComponent />
    // <SectionWrapper
    //   txt="Gallery"
    //   // paginated={true}
    //   // count={count}
    //   // page={page}
    //   // handleChange={handleChange}
    // >
    //   {data.products &&
    //     data.products.map((product) => (
    //       <VerticalCard
    //         imgUrl={product.coverImage.image}
    //         title={product.title}
    //         name={product.owner.name}
    //         category={product.category}
    //         key={product.id}
    //       />
    //     ))}
    // </SectionWrapper>
  );
}

{
  /* <Box
      component="section"
      sx={{
        padding: { xs: "20px 0", md: "20px" },
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr ",
          md: "1fr 1fr ",
          lg: "1fr 1fr 1fr",
        },
        placeItems: "center",
        gap: ".5rem",
      }}
    >
      {data.products &&
        data.products.map((product) => (
          <VerticalCard
            imgUrl={product.coverImage.image}
            title={product.title}
            name={product.owner.name}
            category={product.category}
            key={product.id}
          />
        ))}
    </Box> */
}
