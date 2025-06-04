import { JSX, useState } from "react";
import Customer from "../../Models/Customer";
import { useEffect } from "react";
import customerService from "../../Service/CustomerService";
import { customerStore } from "../../Service/CustomerState";
import CustomerCard from "../CustomerCard/CustomerCard";
import './CustomerList.css';
import { Circles } from "react-loader-spinner";


function CustomerList(): JSX.Element {

    const [isLoading, setLoading] = useState<boolean>(true);
    let [customerList, setCustomerList] = useState<Customer[]>([]);
 
    useEffect(() => {
       (async function getCustomerList() {
          const customerList: Customer[] = await customerService.getCustomerList();
          setCustomerList(customerList);
          setLoading(false);
       })();

      const unsubscribe = customerStore.subscribe(() => {
      const updatedList = customerStore.getState().customerList;
      setCustomerList([...updatedList]);
  });
 
       return () => unsubscribe();
 
    }, []);
 
 
    function onDelete(id: number) {
       setCustomerList([...customerStore.getState().customerList]);
    }
 
 
    return (
       <div className="List">
         {isLoading && (
            <div className="spinner-container">
               <Circles
                  height="60"
                  width="60"
                  color="#4f46e5"
                  ariaLabel="loading"
               />
            </div>
            )}
         <div className="row">
            {!isLoading &&
               customerList.map((customer) => (
               <CustomerCard key={customer.id} customer={customer} onDelete={onDelete} />
               ))}
         </div>
      </div>
   );
 }
 
 export default CustomerList;