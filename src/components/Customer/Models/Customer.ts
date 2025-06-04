interface Customer {
    firstName: string,
    lastName: string,
    email: string,
    password?:string, 
    id?: number,
}

export default Customer;