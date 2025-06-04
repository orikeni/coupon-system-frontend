import { createStore } from "@reduxjs/toolkit";
import Company from "../Models/Company";


export class CompanyState {

    companyList: Company[] = [];
    // sortBy: string = '';
    // filterBy: string = '';
}

export enum CompanyActionType {
    GetCompany = 'GetCompany',
    AddCompany = 'AddCompany',
    UpdateCompany = 'UpdateCompany',
    DeleteCompany = 'DeleteCompany',
    SortBy = 'SortBy',
    FilterBy = 'FilterBy'
}

export interface CompanyAction {
    type: CompanyActionType,
    payload: any
}

export function companyReducer(companyState: CompanyState = new CompanyState(), action: CompanyAction): CompanyState {

    const newState: CompanyState = { ...companyState };

    switch (action.type) {
        case CompanyActionType.GetCompany:
            newState.companyList = action.payload;
            break;
        case CompanyActionType.AddCompany:
            newState.companyList.push(action.payload);
            break;
         case CompanyActionType.UpdateCompany:
             const indexToUpdate = newState.companyList.findIndex(company => +(company.id)! === action.payload.id);
             newState.companyList[indexToUpdate] = action.payload;
             break;
        case CompanyActionType.DeleteCompany:
            const indexToDelete = newState.companyList.findIndex(company => company.id === action.payload);
            newState.companyList.splice(indexToDelete, 1);
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

export const companyStore = createStore(companyReducer);