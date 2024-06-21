import LandingLoader from "@/app/(website)/_components/landingLoader/landingLoader";
import dynamic from "next/dynamic";

const AuctionDetails = dynamic(
  () => import("@/app/(website)/_components/auctionComponent/AuctionDetails"),
  {
    ssr: false,
    loading: () => <LandingLoader />,
  }
);

export default function AuctionDetailPage() {
  return (
    <>
      <AuctionDetails />
    </>
  );
}
