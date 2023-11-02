import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios, { AxiosError } from 'axios';
const Signup = () => {
    const [btnLoading, setBtnLoading] = useState(false);
    let validationSchema = Yup.object({
        name: Yup.string().required("Name is required").min(3, "Name min length is 3").max(10, "Name max length is 10"),
        email: Yup.string().required("Email is required").email(),
        password: Yup.string().required('This field is required').matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
        ),
        rePassword: Yup.string().required('This field is required').oneOf([Yup.ref('password')], 'Password and confirmation should be the same'),
        phone: Yup.string().required('This field is required').matches(/^(010|011|012|015)\d{8}$/, 'Invalid phone number')
    });
    let navigate = useNavigate();
    async function handleSignup(values) {
        try {
            setBtnLoading(true);
            const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
            const { data } = response;

            if (data.message === 'success') {
                setBtnLoading(false)
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                window.alert('This user is already a member');
            } else {
                console.error('An error occurred during signup:', error);
            }
        }
    }

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        onSubmit: handleSignup,
        validationSchema
    });

    return (
        <div className="signup">
            <div className="signupLayout">
                <form className="form" onSubmit={formik.handleSubmit}>
                    <p className="title">Register</p>
                    <p className="message">Signup now and get full access to our website.</p>

                    <label>
                        <input className="input" type="text" required="" id="name" name="name" onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} />
                        <span>Name</span>
                        {formik.errors.name && formik.touched.name && <div className="errors">{formik.errors.name}</div>}
                    </label>

                    <label>
                        <input className="input" type="email" required="" id="email" name="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} />
                        <span>Email</span>
                        {formik.errors.email && formik.touched.email && <div className="errors">{formik.errors.email}</div>}
                    </label>

                    <label>
                        <input className="input" type="password" required="" id="password" name="password" onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} />
                        <span>Password</span>
                        {formik.errors.password && formik.touched.password && <div className="errors">{formik.errors.password}</div>}
                    </label>

                    <label>
                        <input className="input" type="password" required="" id="rePassword" name="rePassword" onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} />
                        <span>Confirm password</span>
                        {formik.errors.rePassword && formik.touched.rePassword && <div className="errors">{formik.errors.rePassword}</div>}
                    </label>

                    <label>
                        <input className="input" type="text" required="" id="phone" name="phone" onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} />
                        <span>Phone</span>
                        {formik.errors.phone && formik.touched.phone && <div className="errors">{formik.errors.phone}</div>}
                    </label>

                    {btnLoading ? <i class="fa-solid fa-spinner btnloadinig"></i> : <button disabled={!(formik.isValid && formik.dirty)} className="submit" type="submit">Signup</button>}
                    <p className="signin">Already have an account? <Link to="/">Sign in</Link></p>
                </form>

                <div className="signupLogo p-4">
                    <div className="logo h1">e-commerce</div>
                </div>
            </div>
        </div>
    );
};

export default Signup;