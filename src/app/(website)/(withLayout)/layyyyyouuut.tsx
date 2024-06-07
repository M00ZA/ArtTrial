import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";

const WithLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default WithLayout;
