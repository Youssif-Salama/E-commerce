import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context/CartContextProvider';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Cart = () => {
    const [loading, setLoading] = useState(false);
    const { GetLoggedUserCart, RemoveCartProduct, UpdateProductCount, ClearUserData, addToCartFalg, FunctionToCallGetLoggedUserCartbasic } = useContext(CartContext); // use const instead of let
    const [resultLoggedUserCart, setResultLoggedUserCart] = useState(null); // use const instead of let
    //bridge to act with GetLoggedUserCart()
    async function FunctionToCallGetLoggedUserCart() {
        setLoading(true);
        const result = await GetLoggedUserCart();
        if (result.data.status === "success") {
            setResultLoggedUserCart(result.data.data);

        } setLoading(false);
    }
    // bridge to act with UpdateCartQuantity
    async function FunctionToCallUpdateProductCount(productId, count) {
        let result = await UpdateProductCount(productId, count);
        if (result.data.status === "success")
        setResultLoggedUserCart(result.data.data);
    }
    //  bridge to act with removeCartProduct
    async function FunctionToCallRemoveCartProduct(productId) {
        FunctionToCallGetLoggedUserCartbasic();
        let result = await RemoveCartProduct(productId);
        if (result.data.status === "success")
        setResultLoggedUserCart(result.data.data);
    
        if (result.data.status === 'success') {
            toast.success("product removed successfully", {
                style: {
                    border: '1px solid #00Bfff',
                    padding: '10px',
                    color: '#00Bfff',
                },
                iconTheme: {
                    primary: '#00Bfff',
                    secondary: '#fff',
                },
            })
        }

    }
    // bridge for ClearUserData
    async function FunctionToCallClearUserData() {
        FunctionToCallGetLoggedUserCartbasic()
        await ClearUserData();
        setResultLoggedUserCart(null);

    }
    // make variable that carry value of status (there are no products)
    const [noProducts, setNoProducts] = useState("")
    useEffect(() => {
        if (addToCartFalg === true) {
            FunctionToCallGetLoggedUserCart();
            FunctionToCallGetLoggedUserCartbasic();
        }
    }, []);
    useEffect(() => {
        setNoProducts("there are no products")
    }, [resultLoggedUserCart, noProducts]);
    return (
        <div className='cart'>
            {loading ? <div className="loader_container">
                <div className='loader'>loading</div>
            </div> : <>
                {resultLoggedUserCart === null ? <div className="noProducts"><div className='container alert alert-info px-1 my-2'>{noProducts}/ back home <a href="/home">click here</a></div></div> : <>
                    <div>
                        <div className='container'>
                            <div className="totalCartPrice&numOfCartItems alert alert-info d-flex align-items-center justify-content-between">
                                <span className='numOfCartItems'>total Cart Price: {resultLoggedUserCart.totalCartPrice}</span>
                                <span className='numOfCartItems'>No Of Cart Items: {resultLoggedUserCart.products.length}</span>
                            </div>
                            <div className='d-flex align-items-center justify-content-around py-2'>
                                <div className="backToHome"><Link to={"/home"} className='text-info'><i className="fa-solid fa-backward p-1"></i></Link></div>
                                <button className='btn btn-outline-info' onClick={FunctionToCallClearUserData}>Remove All</button>
                            </div>
                            {resultLoggedUserCart && resultLoggedUserCart?.products.map(product => (
                                <div key={product._id} className='CartProduct col-md-8 col-10 mx-auto'>
                                    <div className="headeOfMedia text-center text-light py-3 h3">
                                        {product.product.category.name}
                                    </div>
                                    <div className="middleProductMediaPart d-flex align-items-center justify-content-between">
                                        <div className="productDetails">
                                            <div className="brand_image w-50 p-0 m-0">
                                                <img className='w-50' src={product.product.brand.image} alt="brand_image" />
                                            </div>
                                            <div className="productImageAndDetails d-flex align-items-center p-0 m-0">
                                                <div className="productImage w-50">
                                                    <img className='w-100' src={product.product.imageCover} alt="image_product" />
                                                </div>
                                                <div className="productDetails w-50">
                                                    <span className='productTitle h2'>{product.product.title}</span>
                                                    <p className='productPrice opacity'>Product Price: {product.price}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="productModification p-2 w-25 text-center">
                                            <div className="add my-1" onClick={_ => FunctionToCallUpdateProductCount(product.product._id, product.count + 1)}>+</div>
                                            <div className="count my-1">{product.count}</div>
                                            <div className="remove my-1" onClick={_ => FunctionToCallUpdateProductCount(product.product._id, product.count - 1)}>-</div>
                                            <div className="delete bg-danger my-1" onClick={() => FunctionToCallRemoveCartProduct(product.product._id)}><i className="fa-solid fa-trash"></i></div>
                                        </div>
                                    </div>
                                    <div className="quantityAndTotalPrice d-flex align-items-center justify-content-between p-4 text-light bg-color-1">
                                        <div className="productQuatity">
                                            <span>Remaining: </span>{product.product.quantity || "----"}
                                        </div>
                                        <div className="productTotalPrice">
                                            <span>Total Price: </span>{product.count * product.price}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Link to={"/checksession"}><button className='btn btn-outline-info'>Check Session</button></Link>
                        </div>
                    </div>
                </>}
            </>}

        </div>
    );
}

export default Cart;