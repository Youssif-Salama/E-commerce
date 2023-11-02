import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainProduct = (props) => {
    let { productId, name, imageCover, title, price, rating } = props;

    return (
        <Link to={`/Products/${productId}`} className="col-lg-2 col-md-3 my-5 mx-1 col-10 text-center product p-0">
            <div className="cover_image w-100 h-100">
                <img className="w-100" src={imageCover} alt="cover_image" draggable={false} />
            </div>
            <div className="productName text-info p-1 px-2">{name}</div>
            <div className="productTitle midSize opacity p-1 px-2">{title.split(" ").slice(0, 2).join(" ") + "..."}</div>
            <div className="ratingAndPrice d-flex align-items-center justify-content-between p-1 px-2">
                <div className="productPrice"><span className='text-info'>{price}</span><span className='smallSize'>EGP</span></div>
                <div className="productRating"><span className='opacity'>{rating}</span>
                    <i className="smallSize fa-solid fa-star text-warning"></i>
                </div>
            </div>
            <button className="productBtn w-100">Show Product</button>
        </Link>
    );
}

export default MainProduct;
