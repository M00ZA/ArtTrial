import EventComponent from "@/app/(website)/_components/eventComponent/EventComponent";
import Footer from "@/app/(website)/_components/footer/Footer";
import Header from "@/app/(website)/_components/header/Header";

export default function EventView() {
  return (
    <>
      <Header />
      <EventComponent />
      <Footer />
    </>
  );
}
