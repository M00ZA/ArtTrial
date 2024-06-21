// import { EditArtWorkDetails } from "@/app/(website)/_components/artwork/EditArtWorkDetails";

import LandingLoader from "@/app/(website)/_components/landingLoader/landingLoader";
import dynamic from "next/dynamic";

const EditArtWorkDetails = dynamic(
  () => import("@/app/(website)/_components/artwork/EditArtWorkDetails"),
  {
    ssr: false,
    loading: () => <LandingLoader />,
  }
);

export default function EditArtWorkPage() {
  return <EditArtWorkDetails />;
}
