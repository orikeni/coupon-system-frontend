import { JSX, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../Auth/State/AuthState";

interface RoutingProps {
    child: JSX.Element,
}

function RoutingGuard(routingProps: RoutingProps): JSX.Element {

   const navigate = useNavigate();

    useEffect(() => {
        if (authStore.getState().user == null) {
            navigate('/login');
         }
    }, []);

    return routingProps.child;

}

export default RoutingGuard;