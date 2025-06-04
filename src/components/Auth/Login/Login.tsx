import { JSX, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userService from "../../Services/UserService";
import './Login.css';
import User from "../../../Models/User";

function Login(): JSX.Element {

  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<User>();
  const [error, setError] = useState<string>("");


  async function send(user: User): Promise<void> {
    try {
      await userService.login(user);
      navigate('/Main');
    }
    catch(e) {
      setError("Email or password are incorrect.");
    }
  }

  return (
    <form onSubmit={handleSubmit(send)} className="my-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter email"
          {...register("email", {
            required: { value: true, message: 'Required' },
          })} />
        {formState.errors.email && <span className="error-message">{formState.errors.email?.message}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="Enter password"
          {...register("password", {
            required: { value: true, message: 'Required' },
            minLength: { value: 5, message: 'Must contain at least 5 characters' }
          })} />
        {formState.errors.password && <span className="error-message">{formState.errors.password?.message}</span>}
      </div>

      {error && <div className="error-message">{error}</div>}
      <button>Login</button>
    </form>
  );
}

export default Login;