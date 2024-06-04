"use client";
import { getCookie } from "cookies-next";
import Home from "../home/Home";
import UserHome from "../userHome/UserHome";
import { useEffect, useState } from "react";
import { useLoggedInAs } from "@/hooks/useLoggedInAs";
import { useRouter } from "next/navigation";

function ArtistHomePlaceHolder() {
  return <h1>Artist home</h1>;
}

export default function HomeWrapper() {
  const [isSSR, setSSR] = useState(true);
  // const router = useRouter();
  // const [loggedInAs, setLoggedInAs] = useState("");
  // const [memberProfile,setMemberProfile] = useState()
  // const loggedInAs = getCookie("loggedInAs");
  // useEffect(() => {
  //   router.push("/");
  // }, []);

  // const memberProfile = getCookie("memberProfile");
  // useEffect(() => {
  //   setLoggedInAs(getCookie("loggedInAs") as string);
  // }, []);
  // const { loggedInAs, memberProfile } = useLoggedInAs();
  // console.log(loggedInAs);

  useEffect(() => {
    setSSR(false);
  }, []);

  if (isSSR) {
    return <h1>SSR</h1>;
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
        <ArtistHomePlaceHolder />
      )}
    </>
  );
}
