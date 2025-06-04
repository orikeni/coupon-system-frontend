import { createStore } from "@reduxjs/toolkit";
import Customer from "../Models/Customer";


export class CustomerState {

    customerList: Customer[] = [];
    // sortBy: string = '';
    // filterBy: string = '';
}

export enum CustomerActionType {
    GetCustomer = 'GetCustomer',
    AddCustomer = 'AddCustomer',
    UpdateCustomer = 'UpdateCustomer',
    DeleteCustomer = 'DeleteCustomer',
    SortBy = 'SortBy',
    FilterBy = 'FilterBy'
}

export interface CustomerAction {
    type: CustomerActionType,
    payload: any
}

export function customerReducer(customerState: CustomerState = new CustomerState(), action: CustomerAction): CustomerState {

    const newState: CustomerState = { ...customerState };

    switch (action.type) {
        case CustomerActionType.GetCustomer:
            newState.customerList = action.payload;
            break;
        case CustomerActionType.AddCustomer:
            newState.customerList.push(action.payload);
            break;
         case CustomerActionType.UpdateCustomer:
             const indexToUpdate = newState.customerList.findIndex(customer => +(customer.id)! === action.payload.id);
             newState.customerList[indexToUpdate] = action.payload;
             break;
        case CustomerActionType.DeleteCustomer:
            const indexToDelete = newState.customerList.findIndex(customer => customer.id === action.payload);
            newState.customerList.splice(indexToDelete, 1);
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

export const customerStore = createStore(customerReducer);