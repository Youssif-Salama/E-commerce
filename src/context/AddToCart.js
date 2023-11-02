import { createContext } from "react";
import axios from "axios";
export const addToCartContext = createContext();
export function AddToCartContextProvider(props) {
    let headers = {
        token: localStorage.getItem('userToken')
    }
     function AddToCart(productId) {
        return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            // api ask for return {product_id}
            productId
        }, {
            // return token
            headers: headers
        }).then(response => response).catch(error => error);
    }
    return <addToCartContext.Provider value={{ AddToCart }}>
        {props.children}
    </addToCartContext.Provider>
}
