import { useNavigate } from "react-router-dom";
import CompanyList from "../CompanyList/CompanyList";
import { JSX, useEffect } from "react";
import './CompanyPage.css';
import { authStore } from "../../../Auth/State/AuthState";


function CompanyPage(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
      const user = authStore.getState().user;
      if (!user || user.roleId !== 1) {
          navigate('/login');
        }
      }, []);
  
    function addCompany(): void {
      navigate('/company-details');
    }
  
  
    return (
      <div className="CompanyPage">
       <div className="CompanyPage-header">
      <button onClick={addCompany} className="add-item-btn">
        <span className="icon">+</span> Add Company
      </button>
    </div>
        <CompanyList />
      </div>
    );
  }
  
  export default CompanyPage;