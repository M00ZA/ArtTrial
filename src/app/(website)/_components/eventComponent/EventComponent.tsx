"use client";

import ArtistEventComponent from "./ArtistEventComponent";
import UserEventComponent from "./UserEventComponent";

export default function EventsComponent() {
  const loggedInAs = localStorage.getItem("loggedInAs");
  return (
    <>
      {loggedInAs == "user" ? <UserEventComponent /> : <ArtistEventComponent />}
    </>
  );
}
