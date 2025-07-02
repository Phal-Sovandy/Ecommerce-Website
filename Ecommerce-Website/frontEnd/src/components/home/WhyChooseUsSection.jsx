import "../../styles/customer/component-styles/home/WhyChooseUsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast, faHeadset, faCreditCard, faCoins, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

function WhyChooseUsSection() {
  const factors = [
    { icon: <FontAwesomeIcon icon={faTruckFast} size="lg"/>, title: "Fast & Free Shipping", description: "Enjoy quick and free delivery on all orders, ensuring a seamless shopping experience." },
    { icon: <FontAwesomeIcon icon={faHeadset} size="lg"/>, title: "24/7 Customer Support", description: "Our support team is available round the clock to assist you with any queries." },
    { icon: <FontAwesomeIcon icon={faCreditCard} size="lg"/>, title: "Secure Payments", description: "We use encrypted transactions to keep your payment details safe and secure." },
    { icon: <FontAwesomeIcon icon={faCoins} size="lg"/>, title: "Best Price Guarantee", description: "Get the best deals on top brands with our unbeatable price match guarantee." },
    { icon: <FontAwesomeIcon icon={faThumbsUp} size="lg"/>, title: "Quality Assurance", description: "All our products undergo strict quality checks to ensure customer satisfaction." },
  ];

  return (
    <section className="why-choose-us">
      <div className="section-header">
        <h2>Why Choose Us?</h2>
        <p>We provide the best shopping experience with top-quality service and products.</p>
      </div>
      <div className="card-container">
        {factors.map((factor, index) => (
          <div className="feature-card" key={index}>
            <div className="icon">{factor.icon}</div>
            <h3>{factor.title}</h3>
            <p>{factor.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
