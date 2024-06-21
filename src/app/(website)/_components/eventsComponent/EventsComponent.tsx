"use client";
import ArtistEventsComponent from "./ArtistEventsComponent";
import UserEventsComponent from "./UserEventsComponent";

export default function EventsComponent() {
  const loggedInAs = localStorage.getItem("loggedInAs");
  return (
    <>
      {loggedInAs == "user" ? (
        <UserEventsComponent />
      ) : (
        <ArtistEventsComponent />
      )}
    </>
  );
}
