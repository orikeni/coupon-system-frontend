import axios from "axios";
import appConfig from "../../../Config/AppConfig";
import Category from "../Models/Category";


class CategoryService {
    
    isFetch: boolean = false;

    async getCategoryList(): Promise<Category[]> {
        const token = localStorage.getItem("token");
        const response = await axios.get<Category[]>(appConfig.apiAddress + '/category', {
            headers: {
            Authorization: `Bearer ${token}`
            }
            });
        return response.data;
    }
}

const categoryService = new CategoryService();
export default categoryService;