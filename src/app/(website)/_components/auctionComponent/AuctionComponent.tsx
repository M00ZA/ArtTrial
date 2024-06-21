"use client";

import ArtistAuctionComponent from "./ArtistAuctionComponent";
import UserAuctionComponent from "./UserAuctionComponent";

export default function AuctionComponent() {
  const loggedInAs = localStorage.getItem("loggedInAs");
  return (
    <>
      {loggedInAs == "artist" ? (
        <ArtistAuctionComponent />
      ) : (
        <UserAuctionComponent />
      )}
    </>
  );
}
