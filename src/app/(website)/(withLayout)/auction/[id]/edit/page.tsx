// import { EditAuctionComponent } from "@/app/(website)/_components/auctionComponent/EditAuctionComponent";

import LandingLoader from "@/app/(website)/_components/landingLoader/landingLoader";
import dynamic from "next/dynamic";

const EditAuctionComponent = dynamic(
  () =>
    import("@/app/(website)/_components/auctionComponent/EditAuctionComponent"),
  {
    ssr: false,
    loading: () => <LandingLoader />,
  }
);

export default function EditAuctionPage() {
  return <EditAuctionComponent />;
}
