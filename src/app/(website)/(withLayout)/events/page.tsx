// import EventsComponent from "../../_components/eventsComponent/EventsComponent";
import Footer from "../../_components/footer/Footer";
import Header from "../../_components/header/Header";
import dynamic from "next/dynamic";
import LandingLoader from "../../_components/landingLoader/landingLoader";
// import LandingLoader from "../landingLoader/landingLoader";
const EventsComponent = dynamic(
  () => import("../../_components/eventsComponent/EventsComponent"),
  {
    ssr: false,
    loading: () => <LandingLoader />,
  }
);

export default function Events() {
  return (
    <>
      {/* <Header /> */}
      <EventsComponent />
      {/* <Footer /> */}
    </>
  );
}
