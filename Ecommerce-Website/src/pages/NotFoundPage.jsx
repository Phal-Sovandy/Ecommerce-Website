import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "../styles/NotFoundPage.css";

function NotFoundPage() {
  useEffect(() => {
    document.title = "Page Not Found!";
  });
    return (
        <div className="not-found">
            <div className="not-found-content">
                <h1>404</h1>
                <h2>Oops! Page Not Found</h2>
                <p>The page you're looking for might have been removed or is temporarily unavailable.</p>
                <Link to="/" className="home-button">Go Back Home</Link>
            </div>
        </div>
    );
}

export default NotFoundPage;
