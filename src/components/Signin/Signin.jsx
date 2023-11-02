import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const Signin = ({operationsOnToken}) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email(),
    password: Yup.string().required('This field is required').matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    ),
  });

  const handleSignup = async (values) => {
    try {
      setBtnLoading(true);
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
      const { data } = response;

      if (data?.message === 'success') {
        setBtnLoading(false);
        localStorage.setItem('userToken', data.token);
        operationsOnToken();
        navigate('/home');
      }
    } catch (error) {
      if (error?.response && error.response.status === 409) {
        window.alert('This user is already a member');
      } else { 
        console.error('An error occurred during signup:', error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleSignup,
    validationSchema
  });

  return (
    <div className='signinPage d-flex align-items-center justify-content-center'>
      <form className="form" onSubmit={formik.handleSubmit}>
        <p className="form-title">Sign in to your account</p>
        <div className="input-container">
          <input
            type="email"
            placeholder="Enter email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            placeholder="Enter password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
        </div>
        {btnLoading ? (
          <i className="fa-solid fa-spinner btnloading"></i>
        ) : (
          <button type="submit" className="submit" disabled={!(formik.isValid && formik.dirty)}>
            Signin
          </button>
        )}
        <p className="signup-link">
          No account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;