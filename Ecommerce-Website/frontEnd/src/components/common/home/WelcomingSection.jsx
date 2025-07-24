import { Link } from "react-router-dom";
import cartImage from "../../../assets/cart-image.jpg";
import "../../../styles/customer/component-styles/home/WelcomingSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXTwitter,
  faLinkedin,
  faGithub,
  faDiscord,
  faTelegram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../../context/AuthContext";

function WelcomingSection() {
  const { role } = useAuth();
  return (
    <section className="welcome-section">
      <div className="left">
        <div className="top">
          <h1>
            Welcome to <span>Sooner</span>
          </h1>
          <p>
            Your one-stop destination for the latest fashion, electronics, home
            essentials, and more. Discover unbeatable deals and enjoy a seamless
            shopping experience with us.
          </p>

          <div className="btn-container">
            {role === "customer" && (
              <Link to="/shopping">
                <button className="shop-now-btn">Shop Now</button>
              </Link>
            )}
            {role !== "admin" && (<Link to="/contacts">
              <button className="learn-more-btn">Contacts Us</button>
            </Link>)}
          </div>
        </div>
        <div className="center">
          <div className="stats-container">
            <div className="stat-item">
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </div>
            <div className="stat-item">
              <h3>5Years+</h3>
              <p>Experience In Ecommerce</p>
            </div>
            <div className="stat-item">
              <h3>210+</h3>
              <p>Shipping Country</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Products Available</p>
            </div>
          </div>
          <div className="customer-satisfaction">
            <h3>Shop with Confidence</h3>
            <div className="progress-bar">
              <div className="progress"></div>
            </div>
            <p className="customer-feedback">
              Join our community of over 98% satisfied customers!
            </p>
            <div className="social-links">
              <a href="https://x.com/" target="_blank">
                <FontAwesomeIcon size="xl" icon={faSquareXTwitter} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank">
                <FontAwesomeIcon size="xl" icon={faLinkedin} />
              </a>
              <a href="https://github.com/" target="_blank">
                <FontAwesomeIcon size="xl" icon={faGithub} />
              </a>
              <a href="https://discord.com/" target="_blank">
                <FontAwesomeIcon size="xl" icon={faDiscord} />
              </a>
              <a href="mailto:phalsovandy007@gmail.com">
                <FontAwesomeIcon size="xl" icon={faEnvelope} />
              </a>
              <a href="https://telegram.org/" target="_blank">
                <FontAwesomeIcon size="xl" icon={faTelegram} />
              </a>
              <a href="https://www.facebook.com/" target="_blank">
                <FontAwesomeIcon size="xl" icon={faFacebookF} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="right">
        <img src={cartImage} />
      </div>
    </section>
  );
}

export default WelcomingSection;
