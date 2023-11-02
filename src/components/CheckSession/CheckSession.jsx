import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContextProvider';
import { useFormik } from 'formik';
const CheckSession = () => {
    let { CheckOutSession,productId } = useContext(CartContext);
    // bridge to act with CheckOUtSession
    async function FunctionToCallCheckOutSession(values) {
        let result = await CheckOutSession(productId, values);
        if (result.data.status === "success") {
            window.location.href = result.data.session.url;
            console.log(result)
        }

        console.log(result);
    }
    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: FunctionToCallCheckOutSession
    })
    return (
        <div className='checkSession'>

            <div className="subscribe">
                <p>Details here</p>
                <form className='mt-5' onSubmit={formik.handleSubmit}>
                    <input placeholder="details like add..." className="subscribe-input" id='details' name="details" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />
                    <input placeholder="Your phone" className="subscribe-phone" id='phone' name="phone" type="tel" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
                    <input placeholder="Your city" className="subscribe-city" name="city" id='city' type="texxt" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
                    <br />
                    <button className="submit-btn" type="submit">SUBMIT</button>
                </form>
            </div>

        </div>
    );
}

export default CheckSession;
