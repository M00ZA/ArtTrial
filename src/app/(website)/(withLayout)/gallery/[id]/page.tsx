import LandingLoader from "@/app/(website)/_components/landingLoader/landingLoader";
import dynamic from "next/dynamic";

const ArtWorkDetails = dynamic(
  () => import("@/app/(website)/_components/artwork/ArtWorkDetails"),
  {
    ssr: false,
    loading: () => <LandingLoader />,
  }
);

export default function GalleryView() {
  return (
    <>
      <ArtWorkDetails />
    </>
  );
}
