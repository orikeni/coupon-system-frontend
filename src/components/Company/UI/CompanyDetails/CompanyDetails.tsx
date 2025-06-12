import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import Company from "../../Models/Company";
import companyService from "../../Service/CompanyService";
import { companyStore } from "../../Service/CompanyState";
import './CompanyDetails.css';


function CompanyDetails(): JSX.Element {

  const param = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset, setValue } = useForm<Company>();
  const [changePassword, setChangePassword] = useState(false);
  


  useEffect(() => {
    reset();
    
    return () => console.log('Destroy');

  }, []);


  async function send(company: Company): Promise<void> {
    if (param.id) {
       company.id = +param.id;
       if (!changePassword) {
        delete company.password;
        }
       await companyService.updateCompany(company);
        navigate('/company-page');
    }
    else {
      const response = await companyService.addCompany(company);
      if (response) {
        navigate('/company-page');
      }
    }

  }

  if (param.id) {
    const company: Company | undefined = companyStore.getState().companyList.find(company => company.id == param.id);
    if (company) {
      setValue('name', company.name);
      setValue('email', company.email);
      setValue('password', '');
    }
  }


  return (
    <form onSubmit={handleSubmit(send)} className="my-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input disabled={param.id ? true : false} type="text" id="name" placeholder="Enter company name"
          {...register("name", {
            required: { value: true, message: 'Required' },
            minLength: { value: 2, message: 'Must contain at least 2 characters' }
          })} />
        {formState.errors.name && <span className="error-message">{formState.errors.name?.message}</span>}
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


export default CompanyDetails;