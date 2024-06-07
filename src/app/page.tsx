// import Header from "./(website)/_components/header/Header"
// import Footer from "./(website)/_components/footer/Footer"
"use client";
import Membertype from "./(website)/_components/MemberType/MemberType";
import Footer from "./(website)/_components/footer/Footer";
import Header from "./(website)/_components/header/Header";
import MyHome from "./(website)/_components/home/Home";
import LandingLoader from "./(website)/_components/landingLoader/landingLoader";
import HomeWrapper from "./(website)/_components/homeWrapper/HomeWrapper";
import "./globals.css";
// import dynamic from "next/dynamic";
// const HomeWrapper = dynamic(
//   () => import("./(website)/_components/homeWrapper/HomeWrapper"),
//   {
//     ssr: false,
//     loading: () => <LandingLoader />,
//   }
// );

export default function Home() {
  return (
    <>
      <Header />
      <HomeWrapper />
      <Footer />
    </>
  );
}
