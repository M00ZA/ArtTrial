"use client";

import ArtistArtWorkDetails from "./ArtistArtWorkDetails";
import UserArtWorkDetails from "./UserArtWorkDetails";

export default function ArtWorkDetails() {
  const loggedInAs = localStorage.getItem("loggedInAs");
  return (
    <>
      {loggedInAs == "artist" ? (
        <ArtistArtWorkDetails />
      ) : (
        <UserArtWorkDetails />
      )}
    </>
  );
}
