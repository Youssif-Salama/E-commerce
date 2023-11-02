import React, { useState } from 'react';
import './main.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import About from './components/About/About';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Notfound from './components/Notfound/Notfound';
import Cart from './components/Cart/Cart';
import SingleProduct from './components/miniComponents/MainProduct/SingleProduct/SingleProduct';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './context/CartContextProvider';
import { AddToCartContextProvider } from './context/AddToCart';
import { Toaster } from 'react-hot-toast';
import CheckSession from './components/CheckSession/CheckSession';
const App = () => {
  const [savingUserDecodedToken, setSavingUserDecodedToken] = useState(null);
  function operationsOnToken() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setSavingUserDecodedToken(decodedToken);
  }
  let router = createHashRouter([
    {
      path: "", element: <Layout />, children: [
        { index: true, element: <Signin savingUserDecodedToken={savingUserDecodedToken} operationsOnToken={operationsOnToken} /> },
        { path: "Signup", element: <Signup /> },
        { path: "About", element: <ProtectedRoute><About /></ProtectedRoute> },
        { path: "Home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "Cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "CheckSession", element: <ProtectedRoute><CheckSession /></ProtectedRoute> },
        { path: "products/:productId", element: <ProtectedRoute><SingleProduct /></ProtectedRoute> },
        { path: "*", element: <ProtectedRoute><Notfound /></ProtectedRoute> },
      ]
    }
  ]);
  return (
    <div className='app'>
      <AddToCartContextProvider>
        <CartContextProvider>
          <Toaster />
          <RouterProvider router={router}>
            <Layout />
          </RouterProvider>
        </CartContextProvider>
      </AddToCartContextProvider>

    </div>
  );
}

export default App;
