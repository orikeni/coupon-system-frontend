import { useEffect, useState, type JSX } from "react";
import './Main.css';
import { useNavigate } from "react-router-dom";
import { authStore } from "../../Auth/State/AuthState";
import Dashboard from "../../DashBoard/DashBoard";
import { FaTicketAlt } from "react-icons/fa";


function Main(): JSX.Element {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!authStore.getState().token);

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setIsLoggedIn(!!authStore.getState().token);
    });
    return unsubscribe;
  }, []);

  

   return (
    <div className="Main">
      {!isLoggedIn && (
        <div className="not-logged-in">
            <div className="coupon-icon">
                <i className="bi bi-ticket-perforated"></i>
            </div>
          <h1>Welcome to the Coupon Management System </h1>
          <p>Discover, manage and purchase amazing coupons easily and securely.</p>
          <p>Please log in to start your coupon experience.</p>
          <button onClick={() => navigate("/login")}>Sign In</button>
        </div>
      )}

      <div className="welcome-card">
        {isLoggedIn && <Dashboard />}
      </div>
    </div>
  );
}

export default Main;