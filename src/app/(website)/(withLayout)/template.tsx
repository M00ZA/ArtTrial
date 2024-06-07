import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
