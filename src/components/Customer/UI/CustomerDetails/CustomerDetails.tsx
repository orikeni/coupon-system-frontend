import { JSX, useEffect, useState } from 'react';
import './CustomerDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import Customer from '../../Models/Customer';
import { useForm } from 'react-hook-form';
import customerService from '../../Service/CustomerService';
import { customerStore } from '../../Service/CustomerState';



function CustomerDetails(): JSX.Element {

  const param = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset, setValue } = useForm<Customer>();
  const [changePassword, setChangePassword] = useState(false);



  useEffect(() => {
    reset();
    
    return () => console.log('Destroy');

  }, []);


  async function send(customer: Customer): Promise<void> {
    if (param.id) {
       customer.id = +param.id;
       if (!changePassword) {
        delete customer.password;
        }
       await customerService.updateCustomer(customer);
        navigate('/customer-page');
    }
    else {
      const response = await customerService.addCustomer(customer);
      if (response) {
        navigate('/customer-page');
      }
    }

  }

  if (param.id) {
    const customer: Customer | undefined = customerStore.getState().customerList.find(customer => customer.id == param.id);
    if (customer) {
      setValue('firstName', customer.firstName);
      setValue('lastName', customer.lastName);
      setValue('email', customer.email);
      setValue('password', '');
    }
  }


  return (
    <form onSubmit={handleSubmit(send)} className="my-form">
      <div className="form-group">
        <label htmlFor="firstName">First Name</label>
        <input disabled={param.id ? true : false} type="text" id="firstName" placeholder="Enter First Name"
          {...register("firstName", {
            required: { value: true, message: 'Required' },
            minLength: { value: 2, message: 'Must contain at least 2 characters' }
          })} />
        {formState.errors.firstName && <span className="error-message">{formState.errors.firstName?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Last Name</label>
        <input disabled={param.id ? true : false} type="text" id="lastName" placeholder="Enter Last Name"
          {...register("lastName", {
            required: { value: true, message: 'Required' },
            minLength: { value: 2, message: 'Must contain at least 2 characters' }
          })} />
        {formState.errors.lastName && <span className="error-message">{formState.errors.lastName?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter email"
          {...register("email", {
            required: { value: true, message: 'Required' },
          })} />
        {formState.errors.email && <span className="error-message">{formState.errors.email?.message}</span>}
      </div>

        {param.id && (
        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={changePassword}
              onChange={() => setChangePassword(!changePassword)}
            />
            I want to change password
          </label>
        </div>
      )}

        {(!param.id || changePassword) && (
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder={param.id ? "Enter new password" : "Enter password"}
              {...register("password", {
                required: {
                  value: !param.id || changePassword,
                  message: "Password is required"
                },
                minLength: {
                  value: 5,
                  message: "Minimum 5 characters"
                }
              })}
            />
            {formState.errors.password && (
              <span className="error-message">
                {formState.errors.password.message}
              </span>
            )}
          </div>
        )}

      <button>{param.id ? 'Update' : 'Add'}</button>
    </form>
  );
}


export default CustomerDetails;