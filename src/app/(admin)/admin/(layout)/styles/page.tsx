import { StylesComponent } from "@/app/(admin)/_components/styles/styles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Styles',
}

const StylesPage = () => {
  return (
    <div>
      <StylesComponent />
    </div>
  );
}

export default StylesPage;