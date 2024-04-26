import { EventsComponent } from "@/app/(admin)/_components/events/events";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Events',
}

const EventsPage = () => {
  return (
    <div>
      <EventsComponent />
    </div>
  );
}
 
export default EventsPage;