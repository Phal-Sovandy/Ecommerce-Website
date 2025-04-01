import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXTwitter,
  faLinkedin,
  faGithub,
  faDiscord,
  faTelegram,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/component-styles/PageFooter.css";

function PageFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="top">
        <div className="left-footer">
          <div className="info info-1">
            <h2>About Us</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate quae, perspiciatis cumque recusandae repudiandae
              facilis. Nisi quod illo eius maxime repudiandae tenetur provident
              possimus quas earum, dolorum fugiat quia dolore, expedita
              necessitatibus? Laborum corrupti vitae quis veniam ducimus sunt ex
              placeat a tempore exercitationem, facilis et reprehenderit saepe
              impedit aliquid?<br></br>
              <br></br>Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus rerum, impedit modi veritatis qui nesciunt aliquam
              deleniti quam corporis culpa, consequuntur soluta ea fugit iste
              hic expedita odio consectetur labore eum omnis vel, facere sed
              eaque? Itaque maiores fugit exercitationem veniam perspiciatis
              maxime quis perferendis consectetur quod quidem aperiam ex.
            </p>
          </div>
          <div className="info info-2">
            <h2>Branches</h2>
            <div>
              <ul>
                <li>Cambodia</li>
                <li>Singapore</li>
                <li>India</li>
                <li>Switzerland</li>
                <li>Vietnam</li>
                <li>Thailand</li>
                <li>Loas</li>
                <li>Indonesia</li>
              </ul>
              <ul>
                <li>United States</li>
                <li>Brazil</li>
                <li>Mexico</li>
                <li>Argentina</li>
                <li>Chile</li>
                <li>Canada</li>
                <li>Russia</li>
                <li>China</li>
              </ul>
              <ul>
                <li>France</li>
                <li>United Kingdom</li>
                <li>German</li>
                <li>Belgium</li>
                <li>Portugal</li>
                <li>Turkey</li>
                <li>Norway</li>
                <li>Netherland</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="right-footer">
          <div className="info info-3">
            <h2>Follow Us</h2>
            <div className="links-container">
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
          <div className="info info-4">
            <h2>Contac Us</h2>
            <ul>
              <a href="https://en.wikipedia.org/wiki/Cambodia" target="_blank">
                <li>
                  <FontAwesomeIcon icon={faLocationPin} size="lg" />
                  <p>6666, Phnom Penh, Cambodia - 525168</p>
                </li>
              </a>
              <a href="https://voice.google.com/u/0/about" target="_blank">
                <li>
                  <FontAwesomeIcon icon={faPhone} size="lg" />
                  <p>(855) 967-273-000</p>
                </li>
              </a>
              <a href="https://voice.google.com/u/0/about" target="_blank">
                <li>
                  <FontAwesomeIcon icon={faPhone} size="lg" />
                  <p>(855) 123-666-999</p>
                </li>
              </a>
              <a href="mailto:phalsovandy007@gmail.com">
                <li>
                  <FontAwesomeIcon icon={faEnvelope} size="lg" />
                  <p>wearesooner@gmail.com.kh</p>
                </li>
              </a>
            </ul>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        Copyright &copy;{year} All rights reserved | We're Sooner
      </div>
    </footer>
  );
}

export default PageFooter;
