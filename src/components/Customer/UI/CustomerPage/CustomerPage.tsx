import { JSX, useEffect } from 'react';
import './CustomerPage.css';
import { useNavigate } from 'react-router-dom';
import CustomerList from '../CustomerList/CustomerList';
import { authStore } from '../../../Auth/State/AuthState';


function CustomerPage(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
          const user = authStore.getState().user;
          if (!user || user.roleId !== 1) {
              navigate('/login');
            }
          }, []);
  
    function addCustomer(): void {
      navigate('/customer-details');
    }
  
  
    return (
      <div className="CustomerPage">
       <div className="CustomerPage-header">
      <button onClick={addCustomer} className="add-item-btn">
        <span className="icon">+</span> Add Customer
      </button>
    </div>
        <CustomerList />
      </div>
    );
  }
  
  export default CustomerPage;