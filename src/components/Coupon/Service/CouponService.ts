import axios, { AxiosError } from "axios";
import Coupon from "../Models/Coupon";
import appConfig from "../../../Config/AppConfig";
import { CouponActionType, couponStore } from "./CouponState";


class CouponService {

     isFetch: boolean = false;
    dispatch: any;

    async getCouponListByCompany(isForceFetch: boolean = false, companyId: number): Promise<Coupon[]> {
        if (!this.isFetch || isForceFetch) {
            const token = localStorage.getItem("token");
            const response = await axios.get<Coupon[]>(appConfig.apiAddress +'/coupon/company/' + companyId, {
                headers: { Authorization: `Bearer ${token}` }
            });
            couponStore.dispatch({ type: CouponActionType.GetCoupon, payload: response.data });
            this.isFetch = true;
        }
        return couponStore.getState().couponList;
    }

    async addCoupon(coupon: Coupon, companyId: number): Promise<Coupon | undefined> {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post<Coupon>(appConfig.apiAddress + '/coupon/' + companyId , coupon,{
                headers: {
                Authorization: `Bearer ${token}`
                }});
            couponStore.dispatch({ type: CouponActionType.AddCoupon, payload: response.data });
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
                case 1006:
                    alert('Coupon already exist');
                    break;
            }
        }

    }

    async deleteCoupon(id: number): Promise<void> {
        const token = localStorage.getItem("token");
        await axios.delete<Coupon>(appConfig.apiAddress + '/coupon/' + id, {
        headers: { Authorization: `Bearer ${token}` }
        });
        couponStore.dispatch({ type: CouponActionType.DeleteCoupon, payload: id });
    }

     async updateCoupon(coupon: Coupon): Promise<void> {
        const token = localStorage.getItem("token");
         await axios.put<Coupon>(appConfig.apiAddress + '/coupon/update', coupon, {
                headers: {
            Authorization: `Bearer ${token}`
            }
            });
         couponStore.dispatch({ type: CouponActionType.UpdateCoupon, payload: coupon });
     }

     async purchaseCoupon (couponId: number, customerId: number): Promise<void> {
        const token = localStorage.getItem("token");
         await axios.post<Coupon>(
            `${appConfig.apiAddress}/coupon/customer/${couponId}/${customerId}`,
            null,
            {
                headers: {
            Authorization: `Bearer ${token}`
            }
            });
         couponStore.dispatch({ type: CouponActionType.PurchaseCoupon, payload: couponId });
         
     }

        async getCustomerCoupons(customerId: number): Promise<Coupon[]> {
        const token = localStorage.getItem("token");
        const response = await axios.get<Coupon[]>(
            `${appConfig.apiAddress}/coupon/customer/${customerId}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        return response.data;
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

const couponService = new CouponService();
export default couponService;