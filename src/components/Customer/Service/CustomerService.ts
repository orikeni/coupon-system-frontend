import axios, { AxiosError } from "axios";
import appConfig from "../../../Config/AppConfig";
import Customer from "../Models/Customer";
import { CustomerActionType, customerStore } from "./CustomerState";


class CustomerService {

    isFetch: boolean = false;

    async getCustomerList(isForceFetch: boolean = false): Promise<Customer[]> {
        if (!this.isFetch || isForceFetch === true) {
                const token = localStorage.getItem("token");
            const response = await axios.get<Customer[]>(appConfig.apiAddress + '/customer', {
                headers: {
            Authorization: `Bearer ${token}`
            }
            });
            customerStore.dispatch({ type: CustomerActionType.GetCustomer, payload: response.data });
            this.isFetch = true;
        }
        return customerStore.getState().customerList;
    }

    async addCustomer(customer: Customer): Promise<Customer | undefined> {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post<Customer>(appConfig.apiAddress + '/customer', customer,{
                headers: {
                Authorization: `Bearer ${token}`
                }});
            customerStore.dispatch({ type: CustomerActionType.AddCustomer, payload: response.data });
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
                case 1011:
                    alert('Customer already exist');
                    break;
            }
        }

    }

    async deleteCustomer(id: number): Promise<void> {
        const token = localStorage.getItem("token");
        await axios.delete<Customer>(appConfig.apiAddress + '/customer/' + id, {
        headers: { Authorization: `Bearer ${token}` }
        });
        customerStore.dispatch({ type: CustomerActionType.DeleteCustomer, payload: id });
    }

     async updateCustomer(customer: Customer): Promise<void> {
        const token = localStorage.getItem("token");
         await axios.put<Customer>(appConfig.apiAddress + '/customer', customer, {
                headers: {
            Authorization: `Bearer ${token}`
            }
            });
         customerStore.dispatch({ type: CustomerActionType.UpdateCustomer, payload: customer });
     }

    // filterTaskListByTitle(title: string, taskList: Task[]): Task[] {
    //     return taskList.filter(task =>
    //         task.title.toLowerCase().includes(title.toLowerCase()));
    // }

    // sortByPriority(): Task[] {
    //     const tasklistCopy: Task[] = [...taskStore.getState().taskList];
    //     return tasklistCopy.sort((task1: Task, task2: Task) => task1.priority - task2.priority);
    // }

    // sortByTitle(): Task[] {
    //     const tasklistCopy: Task[] = [...taskStore.getState().taskList];
    //     return tasklistCopy.sort((task1: Task, task2: Task) => task1.title.localeCompare(task2.title));
    // }

    // sortByDescription(): Task[] {
    //     const tasklistCopy: Task[] = [...taskStore.getState().taskList];
    //     return tasklistCopy.sort((task1: Task, task2: Task) => task1.description.localeCompare(task2.description));
    // }

}

const customerService = new CustomerService();
export default customerService;