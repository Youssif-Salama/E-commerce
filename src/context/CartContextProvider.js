import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();
const CartContextProvider = (props) => {
  const headers = {
    "token": localStorage.getItem('userToken')
  }
  async function FunctionToCallGetLoggedUserCartbasic() {
    let result = await GetLoggedUserCart();
    if (result?.data?.status === "success") {
      setnoOfCartItems(result.data.numOfCartItems);
      setproductId(result.data.data._id);
    }
  }
  const [noOfCartItems, setnoOfCartItems] = useState(null);
  const [productId, setproductId] = useState(null);
  // make boolean flag to control GetLoggedUserCart just call on click on (addProductToCart)
  //  the intialization is false bydefault untill u click (addProductToCart)
  let [addToCartFalg, setAddToCartFalg] = useState(false);
  // function to act with addToCartFalg
  function ActionsOnAddToCartFalg(value) {
    setAddToCartFalg(value);
  }
  // get logged cart user we use boolean flag to control this function
  async function GetLoggedUserCart() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers
    }).then(response => response).catch(error => error)
  }
  // update cart quantity
  function UpdateProductCount(productId, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
      count
    }, {
      headers
    }).then(response => response).catch(error => error)
  }
  // remove cart product 
  async function RemoveCartProduct(productId) {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}?url=http://localhost:3000`, {
      headers
    }).then(result => result).catch(error => error)
  }
  async function ClearUserData() {
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers }).then(response => response).catch(error => error);
  }
  // function to checkOutSession
  async function CheckOutSession(cartId, details) {
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, { shippingAddress: details }, { headers }).then(response => response).catch(error => error);
  }
  useEffect(_ => {
    FunctionToCallGetLoggedUserCartbasic();
  }, [])
  return (
    <CartContext.Provider value={{ FunctionToCallGetLoggedUserCartbasic, noOfCartItems, productId, GetLoggedUserCart, RemoveCartProduct, UpdateProductCount, CheckOutSession, ClearUserData, ActionsOnAddToCartFalg, addToCartFalg }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;