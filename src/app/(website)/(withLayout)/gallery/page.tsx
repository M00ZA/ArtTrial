import dynamic from "next/dynamic";
import LandingLoader from "../../_components/landingLoader/landingLoader";
const GalleryComponent = dynamic(
  () => import("../../_components/galleryComponent/GalleryComponent"),
  {
    ssr: false,
    loading: () => <LandingLoader />,
  }
);

export default function Gallery() {
  return <GalleryComponent />;
}
