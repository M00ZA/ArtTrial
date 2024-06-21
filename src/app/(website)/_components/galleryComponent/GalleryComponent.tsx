"use client";

import ArtistGalleryComponent from "./ArtistGalleryComponent";
import UserGalleryComponent from "./UserGalleryComponent";

export default function GalleryComponent() {
  const loggedInAs = localStorage.getItem("loggedInAs");
  return (
    <>
      {loggedInAs == "artist" ? (
        <ArtistGalleryComponent />
      ) : (
        <UserGalleryComponent />
      )}
    </>
  );
}
