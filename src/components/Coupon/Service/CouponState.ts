import { createStore } from "@reduxjs/toolkit";
import Coupon from "../Models/Coupon";

export class CouponState {

    couponList: Coupon[] = [];
    // sortBy: string = '';
    // filterBy: string = '';
}

export enum CouponActionType {
    GetCoupon = 'GetCoupon',
    AddCoupon = 'AddCoupon',
    UpdateCoupon = 'UpdateCoupon',
    DeleteCoupon = 'DeleteCoupon',
    PurchaseCoupon = 'PurchaseCoupon',
    SortBy = 'SortBy',
    FilterBy = 'FilterBy'
}

export interface CouponAction {
    type: CouponActionType,
    payload: any
}

export function couponReducer(couponState: CouponState = new CouponState(), action: CouponAction): CouponState {

    const newState: CouponState = { ...couponState };

    switch (action.type) {
        case CouponActionType.GetCoupon:
            newState.couponList = action.payload;
            break;
        case CouponActionType.AddCoupon:
            newState.couponList.push(action.payload);
            break;
         case CouponActionType.UpdateCoupon:
             const indexToUpdate = newState.couponList.findIndex(coupon => +(coupon.id)! === action.payload.id);
             if (indexToUpdate !== -1)
             newState.couponList[indexToUpdate] = action.payload;
             break;
        case CouponActionType.DeleteCoupon:
            const indexToDelete = newState.couponList.findIndex(coupon => coupon.id === action.payload);
            newState.couponList.splice(indexToDelete, 1);
            break;
        case CouponActionType.PurchaseCoupon:
        const indexToPurchase = newState.couponList.findIndex(coupon => coupon.id === action.payload);
        if (indexToPurchase !== -1 && newState.couponList[indexToPurchase].amount > 0) {
            newState.couponList[indexToPurchase] = {
                ...newState.couponList[indexToPurchase],
                amount: newState.couponList[indexToPurchase].amount - 1
            };
        }
        break;
        // case TaskActionType.SortBy:
        //     newState.sortBy = action.payload;
        //     break;
        // case TaskActionType.FilterBy:
        //     newState.filterBy = action.payload;
        //     break;
    }
    return newState;
}

export const couponStore = createStore(couponReducer);