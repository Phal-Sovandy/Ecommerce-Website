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
import sonnerLogo from "../../assets/logo/Sooner_Logo(white).png";
import "../../styles/component-styles/contacts/ContactForm.css";

function Contacts() {
  return (
    <div id="contact-form">
      <div id="left-part">
        <h1>Have a question?</h1>
        <p>
          We’re here to provide you with all the details and support you need to
          make the best decisions for your business. Whether you're curious
          about the full range of services we offer, have specific project
          requirements, or are looking for expert advice on how we can help
          bring your vision to life, our team is ready to assist. We pride
          ourselves on delivering personalized solutions that are tailored to
          your unique goals and challenges. We take the time to understand your
          needs and ensure that every question you have is answered clearly and
          thoroughly.
        </p>
        <p>
          Simply fill out the form below, and one of our experts will get back
          to you promptly with the answers you're looking for. Whether you have
          a quick question or need in-depth assistance, we’re committed to
          delivering exceptional customer service. Your time is valuable, and
          we’re here to make sure your experience with us is smooth,
          informative, and tailored to your needs. We look forward to connecting
          with you and helping you achieve your goals.
        </p>
        <div id="link-social">
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
        <div id="copy-right">
          <div>
            <img src={sonnerLogo} alt="Sooner Logo" />
          </div>
          <p>&copy; Copyright Reserved | Sooner</p>
        </div>
      </div>
      <div id="right-part">
        <h2>Contact Us</h2>
        <form>
          <input id="name" type="text" required placeholder="Full Name" />
          <select id="gender" name="sex" defaultValue="male" required>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input id="country" type="text" required placeholder="Country" />
          <select id="region" name="region" defaultValue="europe" required>
            <option value="europe">Europe</option>
            <option value="africa">Africa</option>
            <option value="mid-asia">Mid-Asia</option>
            <option value="SE-asia">South-East Asia</option>
            <option value="s-america">South America</option>
            <option value="n-america">North America</option>
          </select>
          <input
            id="email"
            type="email"
            required
            placeholder="somename@example.com"
          />
          <input
            id="tel"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}"
            required
            placeholder="123-456-789"
          />
          <input id="com" type="text" placeholder="Comment" maxLength="250" />
          <div id="btn-sub-res">
            <button id="reset" type="reset">
              Reset
            </button>
            <button id="submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Contacts;
