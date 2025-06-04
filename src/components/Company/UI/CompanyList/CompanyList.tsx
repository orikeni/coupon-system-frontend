import { JSX, useState, useEffect } from "react";
import Company from "../../Models/Company";
import companyService from "../../Service/CompanyService";
import CompanyCard from "../CompanyCard/CompanyCard";
import './CompanyList.css';
import { companyStore } from "../../Service/CompanyState";
import { Circles } from "react-loader-spinner";




function CompanyList(): JSX.Element {

    const [isLoading, setLoading] = useState<boolean>(true);
    let [companyList, setCompanyList] = useState<Company[]>([]);
 
    useEffect(() => {
       (async function getCompanyList() {
          const companyList: Company[] = await companyService.getCompanyList();
          setCompanyList(companyList);
          setLoading(false);
       })();

      const unsubscribe = companyStore.subscribe(() => {
      const updatedList = companyStore.getState().companyList;
      setCompanyList([...updatedList]);
  });
       
    //    const subscription = taskStore.subscribe(() => {
    //       let filterdList: Task[] = [];
    //       switch (taskStore.getState().sortBy) {
    //          case 'Sort By Priority':
    //             filterdList = taskService.sortByPriority();
    //             break;
    //          case 'Sort By Title':
    //             filterdList = taskService.sortByTitle();
    //             break;
    //          case 'Sort By Description':
    //             filterdList = taskService.sortByDescription();
    //             break;
    //          case '':
    //             filterdList = taskStore.getState().taskList;
    //             break;
    //       }
    //       filterdList = taskService.filterTaskListByTitle(taskStore.getState().filterBy, filterdList);
    //       setTaskList(filterdList);
    //    });
 
       return () => unsubscribe();
 
    }, []);
 
 
    function onDelete(id: number) {
       setCompanyList([...companyStore.getState().companyList]);
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
               companyList.map((company) => (
               <CompanyCard key={company.id} company={company} onDelete={onDelete} />
               ))}
         </div>
      </div>
   );
 }
 
 export default CompanyList;