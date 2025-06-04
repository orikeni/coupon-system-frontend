import { useEffect, useState, type JSX } from "react";
import './Header.css';
import { useNavigate } from "react-router-dom";
import { authStore, AuthActionType } from "../../Auth/State/AuthState";


function Header(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!authStore.getState().token);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setIsLoggedIn(!!authStore.getState().token);
    });
    return unsubscribe;
  }, []);

  function handleAuthClick() {
    if (isLoggedIn) {
      authStore.dispatch({
          type: AuthActionType.Logout,
          payload: undefined
      });
      navigate("/");
    } else {
      navigate("/login");
    }
  }

  return (
    <header className="Header">
  <div className="header-left">
    <div className="header-inner">
      <button className="header-btn" onClick={() => navigate("/Main")}>
        🏠 Home
      </button>
    </div>
  </div>

  <div className="header-center">
    <h1>Coupon Website</h1>
  </div>

  <div className="header-right">
    <div className="header-inner">
      <button className="header-btn" onClick={handleAuthClick}>
        {isLoggedIn ? "Logout" : "Sign In"}
      </button>
    </div>
  </div>
</header>
  );
}

export default Header;