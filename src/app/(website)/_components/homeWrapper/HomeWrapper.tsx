"use client";
import { getCookie } from "cookies-next";
import Home from "../home/Home";
import UserHome from "../userHome/UserHome";
import { useEffect, useState } from "react";
import { useLoggedInAs } from "@/hooks/useLoggedInAs";
import { useRouter } from "next/navigation";
// import ArtistHome from "../artistHome/ArtistHome";
import dynamic from "next/dynamic";
import LandingLoader from "../landingLoader/landingLoader";
const ArtistHome = dynamic(() => import("../artistHome/ArtistHome"), {
  ssr: false,
  loading: () => <LandingLoader />,
});

export default function HomeWrapper() {
  const [isSSR, setSSR] = useState(true);

  useEffect(() => {
    setSSR(false);
  }, []);

  if (isSSR) {
    return <Home />;
  }

  const loggedInAs = localStorage.getItem("loggedInAs");
  console.log(loggedInAs, "loggedinas");
  return (
    <>
      {!loggedInAs ? (
        <Home />
      ) : loggedInAs == "user" ? (
        <UserHome />
      ) : (
        <ArtistHome />
      )}
    </>
  );
}
