import axios, { AxiosError } from "axios";
import appConfig from "../../../Config/AppConfig";
import Company from "../Models/Company";
import { companyStore, CompanyActionType } from "./CompanyState";


class CompanyService {

    isFetch: boolean = false;

    async getCompanyList(isForceFetch: boolean = false): Promise<Company[]> {
        if (!this.isFetch || isForceFetch === true) {
                const token = localStorage.getItem("token");
            const response = await axios.get<Company[]>(appConfig.apiAddress + '/company', {
                headers: {
            Authorization: `Bearer ${token}`
            }
            });
            companyStore.dispatch({ type: CompanyActionType.GetCompany, payload: response.data });
            this.isFetch = true;
        }
        return companyStore.getState().companyList;
    }

    async addCompany(company: Company): Promise<Company | undefined> {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post<Company>(appConfig.apiAddress + '/company/admin', company,{
                headers: {
                Authorization: `Bearer ${token}`
                }});
            companyStore.dispatch({ type: CompanyActionType.AddCompany, payload: response.data });
            return response.data;
        }
        catch (error) {
            const responseError = error as AxiosError;
            if (responseError.status == 500) {
                alert('...');
                return;
            }
            const responseData = responseError.response?.data as { message: string, code: number };
            switch (responseData.code) {
                case 1002:
                    alert('Company already exist');
                    break;
            }
        }

    }

    async deleteCompany(id: number): Promise<void> {
        const token = localStorage.getItem("token");
        await axios.delete<Company>(appConfig.apiAddress + '/company/admin/' + id, {
        headers: { Authorization: `Bearer ${token}` }
        });
        companyStore.dispatch({ type: CompanyActionType.DeleteCompany, payload: id });
    }

     async updateCompany(company: Company): Promise<void> {
        const token = localStorage.getItem("token");
         await axios.put<Company>(appConfig.apiAddress + '/company/admin', company, {
                headers: {
            Authorization: `Bearer ${token}`
            }
            });
         companyStore.dispatch({ type: CompanyActionType.UpdateCompany, payload: company });
     }



}

const companyService = new CompanyService();
export default companyService;