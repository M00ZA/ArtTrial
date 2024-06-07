"use client";
import "@/components/three/style/css/index.css";
import Overlay from "@/components/three/Overlay";
import Header from "@/app/(website)/_components/header/Header";
// import "/style/css/index.css";

// import LandingLoader from "@/app/(website)/_components/landingLoader/landingLoader";
// import dynamic from "next/dynamic";
// const Overlay = dynamic(() => import("@/components/three/Overlay"), {
//   ssr: false,
//   loading: () => <LandingLoader />,
// });
export default function VR() {
  return (
    <>
      <Header />
      <Overlay />
    </>
  );
}
