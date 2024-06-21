import dynamic from "next/dynamic";
import LandingLoader from "../../_components/landingLoader/landingLoader";
const AuctionComponent = dynamic(
  () => import("../../_components/auctionComponent/AuctionComponent"),
  {
    ssr: false,
    loading: () => <LandingLoader />,
  }
);

export default function AuctionPage() {
  return <AuctionComponent />;
}
