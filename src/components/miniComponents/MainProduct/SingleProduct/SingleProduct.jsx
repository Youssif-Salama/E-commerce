import React, { useContext, useEffect, useState } from 'react';
import Slider from "react-slick";
import axios from 'axios';
import { addToCartContext } from '../../../../context/AddToCart';
import toast from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../../../context/CartContextProvider';
const SingleProduct = () => {
    // start part of adding products to cart (productIdToAddPc)=(productIdToAddProductToCart)
    let { AddToCart } = useContext(addToCartContext);
    let { ActionsOnAddToCartFalg, FunctionToCallGetLoggedUserCartbasic } = useContext(CartContext);
    //  usd boolean flag
    async function AddProductToCart(productId) {
        // set flag==true
        ActionsOnAddToCartFalg(true);
        let response = await AddToCart(productId);
        if (response.data.status === 'success') {
            toast.success(response.data.message, {
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
        else toast.error("fail")
    }
    // loading spinner
    // calling productID from mainProduct in home page 
    const { productId } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState([]);
    async function getProductsForSingle() {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        setProductData(data.data);
        if (productData.length > 0) {
            setIsLoading(false);
        }
        else {
            setIsLoading(true);
        }
    }
    // const currentProduct = productData.find(proId => proId === PID);
    useEffect(_ => {
        getProductsForSingle();
        FunctionToCallGetLoggedUserCartbasic();
    })
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className='container singleProduct'>
            <div className="backToHome"><Link to={"/home"}><i className="fa-solid fa-backward p-1"></i></Link></div>

            {!isLoading ? <div className="loader_container">
                <div className='loader'></div>
            </div> : <div className="d-flex align-items-center justify-content-around row">
                <div className="productImage  col-md-5 py-4 col-12 m-auto">
                    <Slider {...settings}>
                        {productData.images.map((productImgsrc, index) => {
                            return <div key={index} className='w-100 productImgPart'>
                                <img className='w-75 m-auto' src={productImgsrc} alt="carousel-images" />
                            </div>
                        })}
                    </Slider>
                </div>
                <div className="productDetails col-md-5 col-12 m-auto">
                    <h1 className='productBrandName'>{productData.brand.name}</h1>
                    <p className='productTitle opacity'>{productData.title}</p>
                    <div className="ratingAndPrice my-2 d-flex align-items-center justify-content-between">
                        <span className='productPrice'>Price: <span className='text-info'>{productData.price}</span> EGP</span>
                        <span className='productRating'>Rating: {productData.ratingsAverage} <i className="smallSize fa-solid fa-star text-warning"></i></span>
                    </div>
                    <div className="soldAndQuantity my-2 d-flex align-items-center justify-content-between">
                        <span className='productSold'>Sold: {productData.sold}</span>
                        <span className='productQuantity'>Quantity: {productData.quantity > 10 ? <span className='text-info'>{productData.quantity}</span> : <span className='text-danger'>{productData.quantity}</span>}</span>
                    </div>
                    <div className="btnCart d-flex align-items-center justify-content-between">
                        <button className='btn btn-outline-info w-100' onClick={_ => AddProductToCart(productId)}>Add To Cart</button>
                        <button className='btn btn-outline-info w-100'><Link to={"/cart"}>Go To Cart</Link></button>
                    </div>
                </div>
            </div>}

        </div>
    );
}

export default SingleProduct;