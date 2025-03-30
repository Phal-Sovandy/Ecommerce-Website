import { useEffect } from "react";
import ContactForm from "../components/contacts/ContactForm.jsx";
import { COMMENTS } from "../data/comments.js";

import "../styles/Contacts.css";

function Comment({ name, title, comment, index }) {
  return (
    <div className={`comment message${index}`} key={index}>
      <div className="profile-comment-card">
        <h2>{name}</h2>
        <p>{title}</p>
      </div>
      <div className="description-comment">
        <p>{comment}</p>
      </div>
    </div>
  );
}

function Contacts() {
  useEffect(() => {
      document.title = "Contacts At Sooner";
    });
  return (
    <>
      <header>Contacts</header>
      <div className="top-contact">
        <div className="title">
          <h1>Get in Touch – We're Here to Help!</h1>
          <h2>
            Have questions about your order, need assistance, or just want to
            say hello? Our team is ready to assist you. Reach out, and we’ll get
            back to you as soon as possible!
          </h2>
          <p>
            At <strong>We're Sooner</strong>, we’re dedicated to providing top-notch
            customer service. Whether you have questions about a product, need
            help with an order, or require assistance with returns or exchanges,
            we’re here for you. Our team is committed to responding to all
            inquiries within 24 hours, ensuring you get the help you need
            without delay. If you need immediate assistance, feel free to call
            us during business hours. For less urgent matters, you can use our
            contact form or reach out via email. We also encourage you to check
            out our FAQ section, which may have quick answers to common
            questions. We truly value your feedback and want to ensure you have
            the best shopping experience possible. Your satisfaction is our top
            priority, and we’re here to make sure everything goes smoothly.
            Thank you for choosing <strong>We're Sooner</strong>. Don’t hesitate to reach
            out—we look forward to helping you!
          </p>
        </div>

        <div className="comment-container">
          {COMMENTS.map((message, index) => (
            <Comment
              name={message.name}
              title={message.title}
              comment={message.comment}
              index={index + 1}
            />
          ))}
        </div>
      </div>
      <ContactForm />
    </>
  );
}

export default Contacts;
