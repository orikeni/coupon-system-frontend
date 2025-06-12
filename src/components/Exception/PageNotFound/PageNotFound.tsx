import { JSX } from "react";
import "./PageNotFound.css";
import { useNavigate } from "react-router-dom";

function PageNotFound(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="Not Found"
        className="not-found-image"
      />
      <button className="not-found-btn" onClick={() => navigate("/Main")}>
        Go to Home page
      </button>
    </div>
  );
}

export default PageNotFound;