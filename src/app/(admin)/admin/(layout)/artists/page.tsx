import { ArtistsComponent } from "@/app/(admin)/_components/artists/artists";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Artists',
}

const AristsPage = () => {
  return (
    <div>
      <ArtistsComponent />
    </div>
  );
}
 
export default AristsPage;