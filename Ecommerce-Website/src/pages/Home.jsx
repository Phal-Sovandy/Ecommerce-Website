import { useEffect } from "react";

import WelcomingSection from "../components/home/WelcomingSection.jsx";
import BrandSection from "../components/home/BrandSection.jsx";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection.jsx";

import "../styles/Home.css";
function Home() {
  useEffect(() => {
    document.title = "Sooner's Home";
  });
  return (
    <main>
      <WelcomingSection />
      <BrandSection />
      <WhyChooseUsSection />
    </main>
  );
}
export default Home;
