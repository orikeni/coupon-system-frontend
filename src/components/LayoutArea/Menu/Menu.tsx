import { useEffect, useState, type JSX } from "react";
import './Menu.css';
import { useNavigate } from "react-router-dom";
import { authStore } from "../../Auth/State/AuthState";


function Menu(): JSX.Element {
  const [roleId, setRoleId] = useState<number | null>(authStore.getState().user?.roleId ?? null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = authStore.subscribe(() => {
      setRoleId(authStore.getState().user?.roleId ?? null);
    });
    return unsubscribe;
  }, []);

  return (
    <nav className="Menu">
      <ul>
        {roleId === 1 && (
          <>
            <li><button onClick={() => navigate("/company-page")}>Companies</button></li>
            <li><button onClick={() => navigate("/customer-page")}>Customers</button></li>
          </>
        )}

        {roleId === 2 && (
          <li><button onClick={() => navigate("coupon-page")}>My Coupons</button></li>
        )}

        {roleId === 3 && (
          <>
          <li><button onClick={() => navigate("coupon-page")}>All Coupons</button></li>
          <li><button onClick={() => navigate("my-coupons")}>My Coupons</button></li>

          </>
        )}
      </ul>
    </nav>
  );
}

export default Menu;