import axios from "axios";
import { AuthActionType, authStore } from "../Auth/State/AuthState";
import appConfig from "../../Config/AppConfig";
import TokenResponse from "../../Models/Token";
import User from "../../Models/User";


class UserService {

    async login(user: User): Promise<TokenResponse> {
        const response = await axios.post<TokenResponse>(appConfig.apiAddress + '/auth', user);
        authStore.dispatch({type: AuthActionType.Login, payload: response.data.token});
        return response.data;
    }

    async getUserList(): Promise<User[]> {
        const response = await axios.get<User[]>(appConfig.apiAddress + '/user');
        return response.data;
    }


    getUserById(userList: User[], id: number): User {
        return userList.filter(user => user.id == id)[0];
    }

}

const userService = new UserService();
export default userService;