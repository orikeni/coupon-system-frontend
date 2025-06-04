import { createStore } from "redux";
import { jwtDecode } from "jwt-decode";
import User from "../../../Models/User";

export class AuthState {
    token: string | null = null;
    user: User | null = null;

    constructor() {
        const token: string | null = localStorage.getItem("token");
        if (token) {
            this.user = jwtDecode(token);
            this.token = token;
        }
    }
}

export enum AuthActionType {
    Login = "Login",
    Logout = "Logout",
}

export interface AuthAction {
    type: AuthActionType,
    payload: any,
}

export function reducer(authState: AuthState = new AuthState(), action: AuthAction): AuthState {

    const newState: AuthState = { ...authState };

    switch (action.type) {
        case AuthActionType.Login:
            localStorage.setItem("token", action.payload);
            newState.token = action.payload;
            newState.user = jwtDecode(action.payload);
            localStorage.setItem("user", JSON.stringify(newState.user));
            break;
        case AuthActionType.Logout:
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
    }

    return newState;
}

export const authStore = createStore(reducer);