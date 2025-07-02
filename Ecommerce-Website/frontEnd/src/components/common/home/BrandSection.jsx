import logo1 from "../../../assets/brands-logo/adidas.png";
import logo2 from "../../../assets/brands-logo/nike.jpg";
import logo3 from "../../../assets/brands-logo/puma.jpg";
import logo4 from "../../../assets/brands-logo/hm.png";
import logo5 from "../../../assets/brands-logo/fila.jpg";
import logo6 from "../../../assets/brands-logo/levis.png";
import logo7 from "../../../assets/brands-logo/oasis.jpg";
import logo8 from "../../../assets/brands-logo/polo.jpg";
import logo9 from "../../../assets/brands-logo/sketcher.jpg";
import logo10 from "../../../assets/brands-logo/zara.png";
import logo11 from "../../../assets/brands-logo/anker.jpg";
import logo12 from "../../../assets/brands-logo/apple.png";
import logo13 from "../../../assets/brands-logo/asus.png";
import logo14 from "../../../assets/brands-logo/logitech.png";
import "../../../styles/customer/component-styles/home/BrandSection.css";

function BrandSection() {
  const brandLogos = [
    logo1,
    logo2,
    logo3,
    logo4,
    logo5,
    logo6,
    logo7,
    logo8,
    logo9,
    logo10,
    logo11,
    logo12,
    logo13,
    logo14,
  ];

  return (
    <section className="brand-container">
      <h2>Our Best-Selling Brands</h2>
      <div className="brand-list">
        {brandLogos.map((logo, index) => (
          <div className="brand-card" key={index}>
            <img src={logo} alt={`Brand ${index + 1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BrandSection;
