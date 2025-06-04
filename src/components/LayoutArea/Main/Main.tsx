import { useEffect, useState, type JSX } from "react";
import './Main.css';
import { useNavigate } from "react-router-dom";
import { authStore } from "../../Auth/State/AuthState";
import Dashboard from "../../DashBoard/DashBoard";


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
      {!isLoggedIn &&
      <div className="not-logged-in">
        <h2>You are not logged in</h2>
        <p>Please log in to continue using the system.</p>
        <button onClick={() => navigate("/login")}>Sign In</button>
      </div> }
      <div className="welcome-card">
      {isLoggedIn &&
          <Dashboard/>
      }
      </div>
    </div>
  );
}

export default Main;