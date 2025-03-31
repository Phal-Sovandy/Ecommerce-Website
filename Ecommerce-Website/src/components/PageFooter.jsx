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
import "../styles/component-styles/PageFooter.css";

function PageFooter() {
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
              impedit aliquid?
            </p>
          </div>
          <div className="info info-2">
            <h2>Branches</h2>
            <ul>
              <li>Cambodia</li>
              <li>Singapore</li>
              <li>India</li>
              <li>Switzerland</li>
              <li>Cambodia</li>
              <li>Singapore</li>
              <li>India</li>
              <li>Switzerland</li>
            </ul>
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
            <div className="links-container"></div>
          </div>
        </div>
      </div>
      <div className="bottom-footer"></div>
    </footer>
  );
}

export default PageFooter;
