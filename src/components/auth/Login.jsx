import React, { useState } from 'react';
import './loginform.css';
import logo from '../../images/Tharblogo.png';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Login = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const history = useHistory();
    const { register, handleSubmit } = useForm();
  
    const onSubmit = async (data) => {
      try {
        // console.log(data, 'data');
        const res = await axios.post(`${process.env.REACT_APP_DEVELOPMENT}/api/login`, data);
        // console.log(res)
        const accessToken = res.data.AccessToken;
        // console.log(accessToken, 'kkk');
        // console.log(res, 'res');
    
        if (accessToken) {
    
          sessionStorage.setItem('accessToken', accessToken);
          console.log(accessToken, 'login ');
          setIsAuthenticated(true);
          setShowLoginForm(false);
          setTimeout(() => {
            history.push('/Dashboard');
          }, 500);
        } else {
          
          throw new Error('Authentication failed');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred during login';;
        toast(errorMessage || error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    };
    
  return (
    <div className="login-container">
      <div className="card">
        <div className="card-header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" /> {/* Static logo image */}
          </div>
          <h4>welcome back!</h4>
        </div>
        <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ToastContainer />
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter username"
                {...register("email", { required: true })}
                 required 
                
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                required
                {...register("password", { required: true })}
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        
        </div>
      </div>
    </div>
  );
};

export default Login;
