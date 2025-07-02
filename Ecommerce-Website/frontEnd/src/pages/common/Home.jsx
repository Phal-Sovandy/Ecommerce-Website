import { useEffect, useState } from "react";
import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

import WelcomingSection from "../../components/common/home/WelcomingSection.jsx";
import BrandSection from "../../components/common/home/BrandSection.jsx";
import WhyChooseUsSection from "../../components/common/home/WhyChooseUsSection.jsx";

import "../../styles/customer/Home.css";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Sooner's Home";
  });
  return (
    <main>
      <WelcomingSection />
      {loading ? (
        <TailChase size="40" speed="1.75" color="black" />
      ) : (
        <BrandSection />
      )}
      <WhyChooseUsSection />
    </main>
  );
}
export default Home;
