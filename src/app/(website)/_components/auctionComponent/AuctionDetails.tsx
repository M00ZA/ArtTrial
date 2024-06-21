"use client";

import ArtistAuctionDetails from "./ArtistAuctionDetails";
import UserAuctionDetails from "./UserAuctionDetails";

export default function AuctionDetails() {
  const loggedInAs = localStorage.getItem("loggedInAs");
  return (
    <>
      {loggedInAs == "artist" ? (
        <ArtistAuctionDetails />
      ) : (
        <UserAuctionDetails />
      )}
    </>
  );
}
