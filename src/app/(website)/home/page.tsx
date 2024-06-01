import Header from "../_components/header/Header";
import Footer from "../_components/footer/Footer";
// import HomeComponent from "../_components/home/Home";
import UserHome from "../_components/userHome/UserHome";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
export default async function Home() {
  const type = getCookie("type", { cookies });

  return (
    <>
      <Header />
      {type == "user" && <UserHome />}
      <Footer />
    </>
  );
}
