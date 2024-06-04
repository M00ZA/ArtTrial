"use client";
import { getCookie } from "cookies-next";
import Home from "../home/Home";
import UserHome from "../userHome/UserHome";

function ArtistHomePlaceHolder() {
  return <h1>Artist home</h1>;
}

export default function HomeWrapper() {
  const loggedInAs = getCookie("loggedInAs");

  const memberProfile = getCookie("memberProfile");
  console.log(loggedInAs, memberProfile);
  return (
    <>
      {!loggedInAs ? (
        <Home />
      ) : loggedInAs == "user" ? (
        <UserHome />
      ) : (
        <ArtistHomePlaceHolder />
      )}
    </>
  );
}
